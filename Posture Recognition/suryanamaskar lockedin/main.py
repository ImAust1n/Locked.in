import cv2
import mediapipe as mp
import numpy as np
import streamlit as st
import time
from typing import Dict, List, Tuple, Optional
import math

# Import pose detection modules
from pose_detector import PoseDetector
from asana_detector import AsanaDetector
from pose_angles import calculate_angle

class SuryaNamaskarApp:
    def __init__(self):
        self.pose_detector = PoseDetector()
        self.asana_detector = AsanaDetector()
        self.current_asana = 0  # Current step (0-11)
        self.rep_count = 0
        self.pose_sequence = [
            "Pranamasana", "Hasta Uttanasana", "Padahastasana", 
            "Ashwa Sanchalanasana", "Dandasana", "Ashtanga Namaskara",
            "Bhujangasana", "Adho Mukha Svanasana", "Ashwa Sanchalanasana",
            "Padahastasana", "Hasta Uttanasana", "Pranamasana"
        ]
        self.pose_hold_time = {}
        self.min_hold_duration = 2.0  # seconds
        self.last_correct_time = None
        
    def run_app(self):
        st.set_page_config(page_title="Surya Namaskar Detection", layout="wide")
        st.title("🧘 Surya Namaskar Detection App")
        
        # Sidebar with instructions
        with st.sidebar:
            st.header("📋 Instructions")
            st.write("1. Allow camera access")
            st.write("2. Position yourself in camera view")
            st.write("3. Perform each pose for 2+ seconds")
            st.write("4. Follow the sequence order")
            
            st.header("🔄 Current Progress")
            progress = st.progress(self.current_asana / 12)
            st.write(f"Step {self.current_asana + 1}/12: {self.pose_sequence[self.current_asana]}")
            st.write(f"Complete Reps: {self.rep_count}")
        
        # Main camera feed
        col1, col2 = st.columns([2, 1])
        
        with col1:
            st.header("📹 Live Feed")
            camera_placeholder = st.empty()
            
        with col2:
            st.header("📊 Pose Analysis")
            angle_placeholder = st.empty()
            feedback_placeholder = st.empty()
        
        # Initialize camera
        cap = cv2.VideoCapture(0)
        
        if not cap.isOpened():
            st.error("Cannot access camera")
            return
            
        while True:
            ret, frame = cap.read()
            if not ret:
                break
                
            # Flip frame horizontally for mirror effect
            frame = cv2.flip(frame, 1)
            
            # Detect pose
            landmarks = self.pose_detector.detect_pose(frame)
            
            if landmarks is not None and len(landmarks) > 0:
                # Draw pose overlay
                frame = self.pose_detector.draw_pose(frame, landmarks)
                
                # Calculate angles
                angles = self.pose_detector.calculate_all_angles(landmarks)
                
                # Detect current asana
                is_correct, feedback = self.asana_detector.detect_asana(
                    self.pose_sequence[self.current_asana], angles, landmarks
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
                        self.pose_hold_time = {}  # Reset hold times
                        
                        if self.current_asana >= 12:
                            # Complete sequence
                            self.rep_count += 1
                            self.current_asana = 0
                            st.balloons()  # Celebration effect
                else:
                    # Reset hold time if pose is incorrect
                    self.pose_hold_time.pop(self.current_asana, None)
                
                # Display current step and feedback
                cv2.putText(frame, f"Step {self.current_asana + 1}: {self.pose_sequence[self.current_asana]}", 
                           (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                cv2.putText(frame, f"Reps: {self.rep_count}", 
                           (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                
                status_color = (0, 255, 0) if is_correct else (0, 0, 255)
                status_text = "✅ Correct" if is_correct else "❌ Incorrect"
                cv2.putText(frame, status_text, (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.7, status_color, 2)
                
                if feedback:
                    cv2.putText(frame, feedback, (10, 120), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 2)
                
                # Display hold progress
                if self.current_asana in self.pose_hold_time:
                    hold_duration = current_time - self.pose_hold_time[self.current_asana]
                    progress_text = f"Hold: {hold_duration:.1f}s / {self.min_hold_duration}s"
                    cv2.putText(frame, progress_text, (10, 150), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
            
            # Convert BGR to RGB for Streamlit
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            camera_placeholder.image(frame_rgb, channels="RGB", use_column_width=True)
            
            # Update sidebar displays
            with col2:
                if landmarks is not None and len(landmarks) > 0:
                    angle_text = "**Joint Angles:**\n"
                    for joint, angle in angles.items():
                        angle_text += f"- {joint}: {angle:.1f}°\n"
                    angle_placeholder.markdown(angle_text)
                    
                    feedback_color = "green" if is_correct else "red"
                    feedback_text = f":{feedback_color}[{status_text}]"
                    if feedback:
                        feedback_text += f"\n\n**Guidance:** {feedback}"
                    feedback_placeholder.markdown(feedback_text)
            
            # Break on 'q' key (for local running)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        
        cap.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    app = SuryaNamaskarApp()
    app.run_app()