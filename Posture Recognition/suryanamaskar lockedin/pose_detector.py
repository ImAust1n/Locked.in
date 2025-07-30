import cv2
import mediapipe as mp
import numpy as np
from typing import Dict, List, Tuple, Optional
import math

class PoseDetector:
    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.mp_drawing = mp.solutions.drawing_utils
        self.pose = self.mp_pose.Pose(
            static_image_mode=False,
            model_complexity=1,
            smooth_landmarks=True,
            enable_segmentation=False,
            smooth_segmentation=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        
        # Joint connections for visualization
        self.connections = [
            # Head and torso
            (0, 1), (1, 2), (2, 3), (3, 7),  # Face outline
            (0, 4), (4, 5), (5, 6), (6, 8),  # Face outline
            (9, 10),  # Mouth
            
            # Upper body
            (11, 12),  # Shoulders
            (11, 13), (13, 15),  # Left arm
            (12, 14), (14, 16),  # Right arm
            (11, 23), (12, 24),  # Torso
            (23, 24),  # Hips
            
            # Lower body
            (23, 25), (25, 27), (27, 29), (27, 31),  # Left leg
            (24, 26), (26, 28), (28, 30), (28, 32),  # Right leg
        ]
        
    def detect_pose(self, frame):
        """Detect pose landmarks in frame"""
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.pose.process(rgb_frame)
        
        if results.pose_landmarks and results.pose_landmarks.landmark:
            landmarks = []
            for landmark in results.pose_landmarks.landmark:
                landmarks.append([landmark.x, landmark.y, landmark.z])
            return np.array(landmarks)
        return None
    
    def draw_pose(self, frame, landmarks):
        """Draw pose overlay on frame"""
        height, width = frame.shape[:2]
        
        # Convert normalized coordinates to pixel coordinates
        pixel_landmarks = landmarks.copy()
        pixel_landmarks[:, 0] *= width
        pixel_landmarks[:, 1] *= height
        
        # Draw connections
        for connection in self.connections:
            if connection[0] < len(pixel_landmarks) and connection[1] < len(pixel_landmarks):
                pt1 = tuple(pixel_landmarks[connection[0]][:2].astype(int))
                pt2 = tuple(pixel_landmarks[connection[1]][:2].astype(int))
                cv2.line(frame, pt1, pt2, (0, 255, 0), 2)
        
        # Draw landmarks
        for i, landmark in enumerate(pixel_landmarks):
            x, y = int(landmark[0]), int(landmark[1])
            
            # Different colors for different body parts
            if i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]:  # Face
                color = (255, 0, 0)  # Blue
            elif i in [11, 12, 13, 14, 15, 16]:  # Upper body
                color = (0, 255, 0)  # Green
            elif i in [17, 18, 19, 20, 21, 22]:  # Hands
                color = (255, 255, 0)  # Cyan
            else:  # Lower body
                color = (0, 0, 255)  # Red
                
            cv2.circle(frame, (x, y), 5, color, -1)
            
            # Add landmark numbers for debugging
            cv2.putText(frame, str(i), (x + 5, y - 5), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.3, (255, 255, 255), 1)
        
        return frame
    
    def calculate_angle(self, p1, p2, p3):
        """Calculate angle between three points"""
        # Vector from p2 to p1
        v1 = np.array([p1[0] - p2[0], p1[1] - p2[1]])
        # Vector from p2 to p3
        v2 = np.array([p3[0] - p2[0], p3[1] - p2[1]])
        
        # Calculate angle
        cosine_angle = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))
        cosine_angle = np.clip(cosine_angle, -1.0, 1.0)
        angle = np.arccos(cosine_angle)
        
        return np.degrees(angle)
    
    def calculate_all_angles(self, landmarks):
        """Calculate all relevant joint angles"""
        angles = {}
        
        if landmarks is None or len(landmarks) < 33:
            return angles
        
        try:
            # Left arm angles
            if len(landmarks) > 15:
                angles['left_shoulder'] = self.calculate_angle(
                    landmarks[13], landmarks[11], landmarks[23]  # elbow, shoulder, hip
                )
                angles['left_elbow'] = self.calculate_angle(
                    landmarks[11], landmarks[13], landmarks[15]  # shoulder, elbow, wrist
                )
            
            # Right arm angles  
            if len(landmarks) > 16:
                angles['right_shoulder'] = self.calculate_angle(
                    landmarks[14], landmarks[12], landmarks[24]  # elbow, shoulder, hip
                )
                angles['right_elbow'] = self.calculate_angle(
                    landmarks[12], landmarks[14], landmarks[16]  # shoulder, elbow, wrist
                )
            
            # Torso angle
            if len(landmarks) > 25:
                angles['torso'] = self.calculate_angle(
                    landmarks[11], landmarks[23], landmarks[25]  # shoulder, hip, knee
                )
            
            # Left leg angles
            if len(landmarks) > 27:
                angles['left_hip'] = self.calculate_angle(
                    landmarks[11], landmarks[23], landmarks[25]  # shoulder, hip, knee
                )
                angles['left_knee'] = self.calculate_angle(
                    landmarks[23], landmarks[25], landmarks[27]  # hip, knee, ankle
                )
            
            # Right leg angles
            if len(landmarks) > 28:
                angles['right_hip'] = self.calculate_angle(
                    landmarks[12], landmarks[24], landmarks[26]  # shoulder, hip, knee
                )
                angles['right_knee'] = self.calculate_angle(
                    landmarks[24], landmarks[26], landmarks[28]  # hip, knee, ankle
                )
            
            # Spine angle (head to hip)
            if len(landmarks) > 23:
                angles['spine'] = self.calculate_angle(
                    landmarks[0], landmarks[11], landmarks[23]  # nose, shoulder, hip
                )
            
            # Hip width angle (for stance detection)
            if len(landmarks) > 24:
                angles['hip_width'] = abs(landmarks[23][0] - landmarks[24][0])
            
        except Exception as e:
            print(f"Error calculating angles: {e}")
            
        return angles
    
    def get_landmark_position(self, landmarks, landmark_id):
        """Get normalized position of a specific landmark"""
        if landmark_id < len(landmarks):
            return landmarks[landmark_id]
        return None