import cv2
import mediapipe as mp
import numpy as np

class PoseDetector:
    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(
            static_image_mode=False,
            model_complexity=1,
            smooth_landmarks=True,
            enable_segmentation=False,
            smooth_segmentation=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.mp_drawing = mp.solutions.drawing_utils
        self.mp_drawing_styles = mp.solutions.drawing_styles
        
    def detect_pose(self, frame):
        """Detect pose landmarks in the frame"""
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.pose.process(rgb_frame)
        return results
    
    def extract_landmarks(self, pose_landmarks, frame_shape):
        """Extract landmark coordinates"""
        landmarks = {}
        h, w = frame_shape[:2]
        
        # Define landmark indices for key points
        landmark_indices = {
            'nose': 0,
            'left_eye': 2, 'right_eye': 5,
            'left_ear': 7, 'right_ear': 8,
            'left_shoulder': 11, 'right_shoulder': 12,
            'left_elbow': 13, 'right_elbow': 14,
            'left_wrist': 15, 'right_wrist': 16,
            'left_hip': 23, 'right_hip': 24,
            'left_knee': 25, 'right_knee': 26,
            'left_ankle': 27, 'right_ankle': 28,
            'left_heel': 29, 'right_heel': 30,
            'left_foot_index': 31, 'right_foot_index': 32
        }
        
        for name, idx in landmark_indices.items():
            if idx < len(pose_landmarks.landmark):
                landmark = pose_landmarks.landmark[idx]
                landmarks[name] = {
                    'x': int(landmark.x * w),
                    'y': int(landmark.y * h),
                    'visibility': landmark.visibility
                }
        
        return landmarks
    
    @staticmethod
    def calculate_angle(point1, point2, point3):
        """Calculate angle between three points"""
        # Convert points to numpy arrays
        a = np.array([point1['x'], point1['y']])
        b = np.array([point2['x'], point2['y']])
        c = np.array([point3['x'], point3['y']])
        
        # Calculate vectors
        ba = a - b
        bc = c - b
        
        # Calculate angle
        cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
        cosine_angle = np.clip(cosine_angle, -1.0, 1.0)  # Handle numerical errors
        angle = np.arccos(cosine_angle)
        
        return np.degrees(angle)
    
    @staticmethod
    def calculate_distance(point1, point2):
        """Calculate Euclidean distance between two points"""
        return np.sqrt((point1['x'] - point2['x'])**2 + (point1['y'] - point2['y'])**2)
    
    def is_landmark_visible(self, landmark_name, landmarks, threshold=0.5):
        """Check if a landmark is visible above threshold"""
        if landmark_name in landmarks:
            return landmarks[landmark_name]['visibility'] > threshold
        return False