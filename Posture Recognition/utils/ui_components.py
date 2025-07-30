import cv2
import numpy as np

class UIComponents:
    def __init__(self):
        self.colors = {
            'correct': (0, 255, 0),      # Green
            'incorrect': (0, 0, 255),    # Red
            'joint': (255, 255, 0),      # Yellow
            'bone': (255, 0, 255),       # Magenta
            'angle_text': (255, 255, 255), # White
            'feedback_bg': (0, 0, 0)     # Black
        }
        
        # Define skeleton connections
        self.skeleton_connections = [
            # Torso
            ('left_shoulder', 'right_shoulder'),
            ('left_shoulder', 'left_hip'),
            ('right_shoulder', 'right_hip'),
            ('left_hip', 'right_hip'),
            
            # Arms
            ('left_shoulder', 'left_elbow'),
            ('left_elbow', 'left_wrist'),
            ('right_shoulder', 'right_elbow'),
            ('right_elbow', 'right_wrist'),
            
            # Legs
            ('left_hip', 'left_knee'),
            ('left_knee', 'left_ankle'),
            ('right_hip', 'right_knee'),
            ('right_knee', 'right_ankle'),
            
            # Head
            ('nose', 'left_eye'),
            ('nose', 'right_eye'),
            ('left_eye', 'left_ear'),
            ('right_eye', 'right_ear')
        ]
    
    def draw_pose_skeleton(self, frame, landmarks):
        """Draw pose skeleton with joints and connections"""
        annotated_frame = frame.copy()
        
        # Draw connections
        for connection in self.skeleton_connections:
            point1_name, point2_name = connection
            
            if (point1_name in landmarks and point2_name in landmarks and
                landmarks[point1_name]['visibility'] > 0.5 and 
                landmarks[point2_name]['visibility'] > 0.5):
                
                point1 = (landmarks[point1_name]['x'], landmarks[point1_name]['y'])
                point2 = (landmarks[point2_name]['x'], landmarks[point2_name]['y'])
                
                cv2.line(annotated_frame, point1, point2, self.colors['bone'], 3)
        
        # Draw joints
        for landmark_name, landmark_data in landmarks.items():
            if landmark_data['visibility'] > 0.5:
                center = (landmark_data['x'], landmark_data['y'])
                cv2.circle(annotated_frame, center, 8, self.colors['joint'], -1)
                cv2.circle(annotated_frame, center, 10, (0, 0, 0), 2)
        
        return annotated_frame
    
    def draw_angles(self, frame, angles):
        """Draw angle measurements on the frame"""
        annotated_frame = frame.copy()
        
        # Position angles on the frame
        y_offset = 30
        for angle_name, angle_value in angles.items():
            # Format angle text
            angle_text = f"{angle_name.replace('_', ' ').title()}: {angle_value:.1f}°"
            
            # Choose color based on angle name and value
            color = self._get_angle_color(angle_name, angle_value)
            
            # Draw background rectangle
            text_size = cv2.getTextSize(angle_text, cv2.FONT_HERSHEY_SIMPLEX, 0.7, 2)[0]
            cv2.rectangle(annotated_frame, (10, y_offset - 25), 
                         (20 + text_size[0], y_offset + 5), 
                         self.colors['feedback_bg'], -1)
            
            # Draw text
            cv2.putText(annotated_frame, angle_text, (15, y_offset), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
            
            y_offset += 40
        
        return annotated_frame
    
    def draw_feedback(self, frame, exercise_data):
        """Draw exercise feedback on the frame"""
        annotated_frame = frame.copy()
        
        # Get frame dimensions
        h, w = frame.shape[:2]
        
        # Draw status indicator
        status_text = "CORRECT FORM" if exercise_data['correct_form'] else "INCORRECT FORM"
        status_color = self.colors['correct'] if exercise_data['correct_form'] else self.colors['incorrect']
        
        # Draw status background
        status_size = cv2.getTextSize(status_text, cv2.FONT_HERSHEY_SIMPLEX, 1.0, 3)[0]
        cv2.rectangle(annotated_frame, (w - status_size[0] - 20, 10), 
                     (w - 10, 50), self.colors['feedback_bg'], -1)
        
        # Draw status text
        cv2.putText(annotated_frame, status_text, (w - status_size[0] - 15, 35), 
                   cv2.FONT_HERSHEY_SIMPLEX, 1.0, status_color, 3)
        
        # Draw feedback message
        feedback_text = exercise_data['feedback']
        feedback_lines = self._wrap_text(feedback_text, 40)  # Wrap long text
        
        # Calculate total height needed for feedback
        line_height = 30
        total_height = len(feedback_lines) * line_height + 20
        
        # Draw feedback background
        cv2.rectangle(annotated_frame, (10, h - total_height - 10), 
                     (w - 10, h - 10), self.colors['feedback_bg'], -1)
        
        # Draw feedback text
        for i, line in enumerate(feedback_lines):
            y_pos = h - total_height + (i * line_height) + 25
            cv2.putText(annotated_frame, line, (20, y_pos), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.8, self.colors['angle_text'], 2)
        
        return annotated_frame
    
    def _get_angle_color(self, angle_name, angle_value):
        """Get color for angle display based on expected ranges"""
        # Define ideal angle ranges for different body parts
        ideal_ranges = {
            'elbow': (80, 100),      # For push-ups and bicep curls
            'knee': (80, 100),       # For squats
            'hip': (160, 200),       # For body alignment
            'body': (170, 190),      # For plank alignment
            'torso': (120, 160),     # For crunches and sit-ups
            'shoulder': (100, 140),  # For pull-ups and jumping jacks
            'rotation': (20, 80),    # For Russian twists
            'distance': (50, 150)    # For jumping jacks feet distance
        }
        
        # Find matching range
        for key, (min_val, max_val) in ideal_ranges.items():
            if key in angle_name.lower():
                if min_val <= angle_value <= max_val:
                    return self.colors['correct']
                else:
                    return self.colors['incorrect']
        
        # Default to white if no specific range found
        return self.colors['angle_text']
    
    def _wrap_text(self, text, max_chars):
        """Wrap text to fit within specified character limit"""
        words = text.split()
        lines = []
        current_line = ""
        
        for word in words:
            if len(current_line + " " + word) <= max_chars:
                current_line = current_line + " " + word if current_line else word
            else:
                if current_line:
                    lines.append(current_line)
                current_line = word
        
        if current_line:
            lines.append(current_line)
        
        return lines
    
    def draw_rep_counter(self, frame, reps, sets):
        """Draw rep and set counter on frame"""
        annotated_frame = frame.copy()
        h, w = frame.shape[:2]
        
        # Draw counter background
        cv2.rectangle(annotated_frame, (w - 200, 60), (w - 10, 140), 
                     self.colors['feedback_bg'], -1)
        
        # Draw rep count
        rep_text = f"Reps: {reps}"
        cv2.putText(annotated_frame, rep_text, (w - 190, 85), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.8, self.colors['angle_text'], 2)
        
        # Draw set count
        set_text = f"Sets: {sets}"
        cv2.putText(annotated_frame, set_text, (w - 190, 115), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.8, self.colors['angle_text'], 2)
        
        return annotated_frame