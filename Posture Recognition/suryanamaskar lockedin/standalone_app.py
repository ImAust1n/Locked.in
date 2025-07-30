import cv2
import mediapipe as mp
import numpy as np
import time
from typing import Dict, List, Tuple, Optional
import tkinter as tk
from tkinter import ttk
import threading

# Import our modules
from pose_detector import PoseDetector
from asana_detector import AsanaDetector

class SuryaNamaskarDesktopApp:
    def __init__(self):
        self.pose_detector = PoseDetector()
        self.asana_detector = AsanaDetector()
        self.current_asana = 0
        self.rep_count = 0
        self.pose_sequence = [
            "Pranamasana", "Hasta Uttanasana", "Padahastasana", 
            "Ashwa Sanchalanasana", "Dandasana", "Ashtanga Namaskara",
            "Bhujangasana", "Adho Mukha Svanasana", "Ashwa Sanchalanasana",
            "Padahastasana", "Hasta Uttanasana", "Pranamasana"
        ]
        self.pose_hold_time = {}
        self.min_hold_duration = 2.0
        self.is_running = False
        self.cap = None
        
        # Create GUI
        self.setup_gui()
        
    def setup_gui(self):
        """Setup the GUI interface"""
        self.root = tk.Tk()
        self.root.title("Surya Namaskar Detection App")
        self.root.geometry("1200x800")
        
        # Main frame
        main_frame = ttk.Frame(self.root)
        main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Left panel for controls and info
        left_panel = ttk.Frame(main_frame, width=300)
        left_panel.pack(side=tk.LEFT, fill=tk.Y, padx=(0, 10))
        left_panel.pack_propagate(False)
        
        # Title
        title_label = ttk.Label(left_panel, text="🧘 Surya Namaskar Detection", 
                               font=("Arial", 16, "bold"))
        title_label.pack(pady=(0, 20))
        
        # Progress section
        progress_frame = ttk.LabelFrame(left_panel, text="Current Progress", padding=10)
        progress_frame.pack(fill=tk.X, pady=(0, 10))
        
        self.progress_var = tk.StringVar(value="Step 1/12: Pranamasana")
        self.progress_label = ttk.Label(progress_frame, textvariable=self.progress_var)
        self.progress_label.pack()
        
        self.progress_bar = ttk.Progressbar(progress_frame, length=200, mode='determinate')
        self.progress_bar.pack(pady=(5, 0))
        self.progress_bar['maximum'] = 12
        self.progress_bar['value'] = 1
        
        self.rep_var = tk.StringVar(value="Complete Reps: 0")
        self.rep_label = ttk.Label(progress_frame, textvariable=self.rep_var)
        self.rep_label.pack(pady=(10, 0))
        
        # Status section
        status_frame = ttk.LabelFrame(left_panel, text="Pose Status", padding=10)
        status_frame.pack(fill=tk.X, pady=(0, 10))
        
        self.status_var = tk.StringVar(value="❌ Not Detected")
        self.status_label = ttk.Label(status_frame, textvariable=self.status_var)
        self.status_label.pack()
        
        self.feedback_var = tk.StringVar(value="Position yourself in camera view")
        self.feedback_label = ttk.Label(status_frame, textvariable=self.feedback_var, 
                                       wraplength=250, justify=tk.LEFT)
        self.feedback_label.pack(pady=(10, 0))
        
        # Hold timer
        self.hold_var = tk.StringVar(value="Hold: 0.0s / 2.0s")
        self.hold_label = ttk.Label(status_frame, textvariable=self.hold_var)
        self.hold_label.pack(pady=(10, 0))
        
        # Angles section
        angles_frame = ttk.LabelFrame(left_panel, text="Joint Angles", padding=10)
        angles_frame.pack(fill=tk.BOTH, expand=True, pady=(0, 10))
        
        self.angles_text = tk.Text(angles_frame, height=10, width=30)
        self.angles_text.pack(fill=tk.BOTH, expand=True)
        
        # Controls
        controls_frame = ttk.Frame(left_panel)
        controls_frame.pack(fill=tk.X)
        
        self.start_button = ttk.Button(controls_frame, text="Start Detection", 
                                      command=self.toggle_detection)
        self.start_button.pack(fill=tk.X, pady=(0, 5))
        
        reset_button = ttk.Button(controls_frame, text="Reset Progress", 
                                 command=self.reset_progress)
        reset_button.pack(fill=tk.X)
        
        # Right panel for camera feed
        self.camera_frame = ttk.LabelFrame(main_frame, text="Camera Feed", padding=10)
        self.camera_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)
        
        self.camera_label = ttk.Label(self.camera_frame, text="Camera feed will appear here")
        self.camera_label.pack(expand=True)
        
    def toggle_detection(self):
        """Start or stop pose detection"""
        if not self.is_running:
            self.start_detection()
        else:
            self.stop_detection()
    
    def start_detection(self):
        """Start pose detection"""
        self.cap = cv2.VideoCapture(0)
        if not self.cap.isOpened():
            tk.messagebox.showerror("Error", "Cannot access camera")
            return
        
        self.is_running = True
        self.start_button.config(text="Stop Detection")
        
        # Start detection in separate thread
        self.detection_thread = threading.Thread(target=self.detection_loop)
        self.detection_thread.daemon = True
        self.detection_thread.start()
    
    def stop_detection(self):
        """Stop pose detection"""
        self.is_running = False
        if self.cap:
            self.cap.release()
        self.start_button.config(text="Start Detection")
        
        # Clear camera display
        self.camera_label.config(image='', text="Camera feed stopped")
    
    def detection_loop(self):
        """Main detection loop"""
        while self.is_running:
            if not self.cap or not self.cap.isOpened():
                break
                
            ret, frame = self.cap.read()
            if not ret:
                continue
            
            # Flip frame for mirror effect
            frame = cv2.flip(frame, 1)
            
            # Detect pose
            landmarks = self.pose_detector.detect_pose(frame)
            
            if landmarks is not None and len(landmarks) > 0:
                # Draw pose overlay
                frame = self.pose_detector.draw_pose(frame, landmarks)
                
                # Calculate angles
                angles = self.pose_detector.calculate_all_angles(landmarks)
                
                # Detect current asana
                current_asana_name = self.pose_sequence[self.current_asana]
                is_correct, feedback = self.asana_detector.detect_asana(
                    current_asana_name, angles, landmarks
                )
                
                # Update pose hold time
                current_time = time.time()
                if is_correct:
                    if self.current_asana not in self.pose_hold_time:
                        self.pose_hold_time[self.current_asana] = current_time
                    
                    hold_duration = current_time - self.pose_hold_time[self.current_asana]
                    
                    if hold_duration >= self.min_hold_duration:
                        # Move to next pose
                        self.current_asana += 1
                        self.pose_hold_time = {}
                        
                        if self.current_asana >= 12:
                            # Complete sequence
                            self.rep_count += 1
                            self.current_asana = 0
                else:
                    # Reset hold time if pose is incorrect
                    self.pose_hold_time.pop(self.current_asana, None)
                
                # Update GUI
                self.update_gui(angles, is_correct, feedback, current_time)
                
                # Add overlay text to frame
                self.add_frame_overlay(frame, is_correct, feedback, current_time)
            
            # Convert frame for display
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            
            # Resize frame for display
            height, width = frame_rgb.shape[:2]
            display_width = 640
            display_height = int(height * display_width / width)
            frame_resized = cv2.resize(frame_rgb, (display_width, display_height))
            
            # Convert to PhotoImage and display
            from PIL import Image, ImageTk
            img = Image.fromarray(frame_resized)
            photo = ImageTk.PhotoImage(image=img)
            
            # Update camera display (must be done in main thread)
            self.root.after(0, self.update_camera_display, photo)
            
            # Small delay to prevent high CPU usage
            time.sleep(0.03)
    
    def update_camera_display(self, photo):
        """Update camera display in main thread"""
        if self.is_running:
            self.camera_label.config(image=photo, text='')
            self.camera_label.image = photo  # Keep a reference
    
    def add_frame_overlay(self, frame, is_correct, feedback, current_time):
        """Add text overlay to camera frame"""
        # Current step
        step_text = f"Step {self.current_asana + 1}/12: {self.pose_sequence[self.current_asana]}"
        cv2.putText(frame, step_text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        # Rep count
        rep_text = f"Reps: {self.rep_count}"
        cv2.putText(frame, rep_text, (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        # Status
        status_color = (0, 255, 0) if is_correct else (0, 0, 255)
        status_text = "✅ Correct" if is_correct else "❌ Incorrect"
        cv2.putText(frame, status_text, (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.7, status_color, 2)
        
        # Feedback
        if feedback:
            cv2.putText(frame, feedback, (10, 120), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 2)
        
        # Hold progress
        if self.current_asana in self.pose_hold_time:
            hold_duration = current_time - self.pose_hold_time[self.current_asana]
            progress_text = f"Hold: {hold_duration:.1f}s / {self.min_hold_duration}s"
            cv2.putText(frame, progress_text, (10, 150), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
    
    def update_gui(self, angles, is_correct, feedback, current_time):
        """Update GUI elements"""
        # Update progress
        self.progress_var.set(f"Step {self.current_asana + 1}/12: {self.pose_sequence[self.current_asana]}")
        self.progress_bar['value'] = self.current_asana + 1
        
        # Update rep count
        self.rep_var.set(f"Complete Reps: {self.rep_count}")
        
        # Update status
        status_text = "✅ Correct Pose" if is_correct else "❌ Incorrect Pose"
        self.status_var.set(status_text)
        
        # Update feedback
        self.feedback_var.set(feedback if feedback else "Keep holding the pose")
        
        # Update hold timer
        if self.current_asana in self.pose_hold_time:
            hold_duration = current_time - self.pose_hold_time[self.current_asana]
            self.hold_var.set(f"Hold: {hold_duration:.1f}s / {self.min_hold_duration}s")
        else:
            self.hold_var.set("Hold: 0.0s / 2.0s")
        
        # Update angles
        self.angles_text.delete(1.0, tk.END)
        angle_text = "Joint Angles:\n"
        for joint, angle in angles.items():
            angle_text += f"{joint.replace('_', ' ').title()}: {angle:.1f}°\n"
        self.angles_text.insert(1.0, angle_text)
    
    def reset_progress(self):
        """Reset all progress"""
        self.current_asana = 0
        self.rep_count = 0
        self.pose_hold_time = {}
        
        # Update GUI
        self.progress_var.set("Step 1/12: Pranamasana")
        self.progress_bar['value'] = 1
        self.rep_var.set("Complete Reps: 0")
        self.status_var.set("❌ Not Detected")
        self.feedback_var.set("Position yourself in camera view")
        self.hold_var.set("Hold: 0.0s / 2.0s")
    
    def run(self):
        """Run the application"""
        try:
            self.root.protocol("WM_DELETE_WINDOW", self.on_closing)
            self.root.mainloop()
        except Exception as e:
            print(f"Error running app: {e}")
    
    def on_closing(self):
        """Handle application closing"""
        self.is_running = False
        if self.cap:
            self.cap.release()
        cv2.destroyAllWindows()
        self.root.destroy()

if __name__ == "__main__":
    try:
        # Install required packages for PIL
        import PIL
    except ImportError:
        print("Please install Pillow: pip install Pillow")
        exit(1)
    
    app = SuryaNamaskarDesktopApp()
    app.run()