import numpy as np
import math

def calculate_angle(point1, point2, point3):
    """
    Calculate angle between three points
    point2 is the vertex of the angle
    """
    # Convert to numpy arrays
    p1 = np.array(point1[:2])  # Use only x, y coordinates
    p2 = np.array(point2[:2])
    p3 = np.array(point3[:2])
    
    # Calculate vectors
    vector1 = p1 - p2
    vector2 = p3 - p2
    
    # Calculate magnitudes
    mag1 = np.linalg.norm(vector1)
    mag2 = np.linalg.norm(vector2)
    
    # Avoid division by zero
    if mag1 == 0 or mag2 == 0:
        return 0
    
    # Calculate cosine of angle
    cos_angle = np.dot(vector1, vector2) / (mag1 * mag2)
    
    # Clamp to valid range for arccos
    cos_angle = np.clip(cos_angle, -1.0, 1.0)
    
    # Calculate angle in radians and convert to degrees
    angle_rad = np.arccos(cos_angle)
    angle_deg = np.degrees(angle_rad)
    
    return angle_deg

def calculate_distance_2d(point1, point2):
    """Calculate 2D distance between two points"""
    p1 = np.array(point1[:2])
    p2 = np.array(point2[:2])
    return np.linalg.norm(p1 - p2)

def calculate_slope(point1, point2):
    """Calculate slope between two points"""
    if point2[0] == point1[0]:  # Vertical line
        return float('inf')
    return (point2[1] - point1[1]) / (point2[0] - point1[0])

def calculate_body_alignment(landmarks):
    """
    Calculate body alignment metrics
    Returns alignment scores for different body segments
    """
    alignments = {}
    
    try:
        # Shoulder alignment (should be horizontal)
        left_shoulder = landmarks[11]
        right_shoulder = landmarks[12]
        shoulder_slope = abs(calculate_slope(left_shoulder, right_shoulder))
        alignments['shoulder_level'] = min(1.0, 1.0 / (1.0 + shoulder_slope * 10))
        
        # Hip alignment (should be horizontal)
        left_hip = landmarks[23]
        right_hip = landmarks[24]
        hip_slope = abs(calculate_slope(left_hip, right_hip))
        alignments['hip_level'] = min(1.0, 1.0 / (1.0 + hip_slope * 10))
        
        # Spine alignment (head to hip center)
        head = landmarks[0]
        hip_center = [(left_hip[0] + right_hip[0]) / 2, (left_hip[1] + right_hip[1]) / 2]
        spine_slope = abs(calculate_slope(head, hip_center))
        alignments['spine_straight'] = min(1.0, 1.0 / (1.0 + spine_slope * 5))
        
        # Leg alignment (hip to ankle)
        left_ankle = landmarks[27]
        right_ankle = landmarks[28]
        
        left_leg_slope = abs(calculate_slope(left_hip, left_ankle))
        right_leg_slope = abs(calculate_slope(right_hip, right_ankle))
        
        alignments['left_leg_straight'] = min(1.0, 1.0 / (1.0 + left_leg_slope * 5))
        alignments['right_leg_straight'] = min(1.0, 1.0 / (1.0 + right_leg_slope * 5))
        
    except Exception as e:
        print(f"Error calculating alignments: {e}")
        alignments = {key: 0.0 for key in ['shoulder_level', 'hip_level', 'spine_straight', 
                                          'left_leg_straight', 'right_leg_straight']}
    
    return alignments

def get_body_center(landmarks):
    """Calculate center point of the body"""
    # Use torso landmarks for center calculation
    torso_points = [landmarks[11], landmarks[12], landmarks[23], landmarks[24]]
    center_x = sum(point[0] for point in torso_points) / len(torso_points)
    center_y = sum(point[1] for point in torso_points) / len(torso_points)
    return [center_x, center_y]

def calculate_pose_stability(landmarks, previous_landmarks=None):
    """
    Calculate pose stability by comparing with previous frame
    Returns stability score (0-1, higher is more stable)
    """
    if previous_landmarks is None:
        return 1.0
    
    try:
        # Calculate movement of key joints
        key_joints = [0, 11, 12, 15, 16, 23, 24, 27, 28]  # Head, shoulders, wrists, hips, ankles
        total_movement = 0
        
        for joint_idx in key_joints:
            if joint_idx < len(landmarks) and joint_idx < len(previous_landmarks):
                current = landmarks[joint_idx]
                previous = previous_landmarks[joint_idx]
                movement = calculate_distance_2d(current, previous)
                total_movement += movement
        
        # Normalize movement (lower movement = higher stability)
        avg_movement = total_movement / len(key_joints)
        stability = max(0.0, 1.0 - avg_movement * 20)  # Scale factor for sensitivity
        
        return stability
        
    except Exception as e:
        print(f"Error calculating stability: {e}")
        return 0.5  # Neutral stability if calculation fails

def validate_pose_landmarks(landmarks):
    """
    Validate that pose landmarks are reasonable
    Returns True if landmarks seem valid, False otherwise
    """
    if landmarks is None or len(landmarks) < 33:
        return False
    
    try:
        # Check that key landmarks are within reasonable bounds
        for landmark in landmarks:
            if not (0 <= landmark[0] <= 1) or not (0 <= landmark[1] <= 1):
                return False
        
        # Check basic body proportions
        head = landmarks[0]
        left_shoulder = landmarks[11]
        right_shoulder = landmarks[12]
        left_hip = landmarks[23]
        right_hip = landmarks[24]
        
        # Head should be above shoulders
        if head[1] > left_shoulder[1] or head[1] > right_shoulder[1]:
            return False
        
        # Shoulders should be above hips
        if left_shoulder[1] > left_hip[1] or right_shoulder[1] > right_hip[1]:
            return False
        
        # Shoulders should be reasonably spaced
        shoulder_distance = calculate_distance_2d(left_shoulder, right_shoulder)
        if shoulder_distance < 0.05 or shoulder_distance > 0.5:
            return False
        
        return True
        
    except Exception as e:
        print(f"Error validating landmarks: {e}")
        return False