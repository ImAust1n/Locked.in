"""
Helper functions for exercise-specific calculations and validations
"""
import numpy as np
from config.exercise_config import EXERCISE_CONFIG

class ExerciseHelpers:
    @staticmethod
    def validate_landmarks(exercise_name, landmarks):
        """Validate if required landmarks are present for the exercise"""
        if exercise_name not in EXERCISE_CONFIG:
            return False, "Exercise not supported"
        
        required = EXERCISE_CONFIG[exercise_name]['required_landmarks']
        missing = [lm for lm in required if lm not in landmarks or landmarks[lm]['visibility'] < 0.5]
        
        if missing:
            return False, f"Please ensure these body parts are visible: {', '.join(missing)}"
        
        return True, "All required landmarks detected"
    
    @staticmethod
    def calculate_body_alignment(landmarks):
        """Calculate body alignment score (0-1, 1 being perfect)"""
        if not all(key in landmarks for key in ['left_shoulder', 'left_hip', 'left_knee']):
            return 0
        
        # Calculate angle from shoulder to hip to knee
        angle = ExerciseHelpers.calculate_angle(
            landmarks['left_shoulder'], 
            landmarks['left_hip'], 
            landmarks['left_knee']
        )
        
        # Perfect alignment is around 180 degrees
        alignment_score = 1 - abs(180 - angle) / 180
        return max(0, alignment_score)
    
    @staticmethod
    def calculate_angle(point1, point2, point3):
        """Calculate angle between three points"""
        a = np.array([point1['x'], point1['y']])
        b = np.array([point2['x'], point2['y']])
        c = np.array([point3['x'], point3['y']])
        
        ba = a - b
        bc = c - b
        
        cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
        cosine_angle = np.clip(cosine_angle, -1.0, 1.0)
        angle = np.arccos(cosine_angle)
        
        return np.degrees(angle)
    
    @staticmethod
    def calculate_distance(point1, point2):
        """Calculate Euclidean distance between two points"""
        return np.sqrt((point1['x'] - point2['x'])**2 + (point1['y'] - point2['y'])**2)
    
    @staticmethod
    def check_knee_valgus(landmarks):
        """Check for knee valgus (knees caving in)"""
        if not all(key in landmarks for key in ['left_knee', 'right_knee', 'left_hip', 'right_hip']):
            return False, "Cannot assess knee alignment"
        
        knee_distance = abs(landmarks['left_knee']['x'] - landmarks['right_knee']['x'])
        hip_distance = abs(landmarks['left_hip']['x'] - landmarks['right_hip']['x'])
        
        if knee_distance < hip_distance * 0.7:
            return True, "Knees are caving inward"
        
        return False, "Good knee alignment"
    
    @staticmethod
    def assess_range_of_motion(current_angle, exercise_name, joint_name):
        """Assess if the range of motion is adequate for the exercise"""
        if exercise_name not in EXERCISE_CONFIG:
            return "Unknown exercise"
        
        config = EXERCISE_CONFIG[exercise_name]['angle_thresholds']
        
        # Exercise-specific ROM assessment
        if exercise_name == "Push-ups":
            if joint_name == "elbow":
                if current_angle < config['down_position']:
                    return "Good depth - now push up"
                elif current_angle > config['up_position']:
                    return "Starting position - now lower down"
                else:
                    return "Continue movement"
        
        elif exercise_name == "Squats":
            if joint_name == "knee":
                if current_angle < config['down_position']:
                    return "Excellent depth - now stand up"
                elif current_angle > config['up_position']:
                    return "Lower down more"
                else:
                    return "Good squat depth"
        
        elif exercise_name == "Bicep Curls":
            if joint_name == "elbow":
                if current_angle < config['contracted_position']:
                    return "Perfect contraction - now lower"
                elif current_angle > config['extended_position']:
                    return "Starting position - now curl up"
                else:
                    return "Continue curling"
        
        return "Maintain good form"
    
    @staticmethod
    def check_exercise_timing(timestamps, exercise_name):
        """Check if exercise is being performed at appropriate speed"""
        if len(timestamps) < 3:
            return "Continue movement"
        
        # Calculate movement speed (time between rep phases)
        recent_intervals = np.diff(timestamps[-3:])
        avg_interval = np.mean(recent_intervals)
        
        # Recommended timing for different exercises (seconds)
        recommended_timing = {
            "Push-ups": (1.5, 3.0),
            "Squats": (2.0, 4.0),
            "Bicep Curls": (2.0, 3.5),
            "Crunches": (2.0, 3.0),
            "Sit-ups": (2.5, 4.0),
            "Pull-ups": (3.0, 5.0),
            "Russian Twists": (1.0, 2.0),
            "Jumping Jacks": (0.5, 1.5)
        }
        
        if exercise_name in recommended_timing:
            min_time, max_time = recommended_timing[exercise_name]
            
            if avg_interval < min_time:
                return "Slow down - control the movement"
            elif avg_interval > max_time:
                return "Speed up the movement"
            else:
                return "Good tempo"
        
        return "Maintain steady rhythm"
    
    @staticmethod
    def get_exercise_tips(exercise_name):
        """Get general tips for proper exercise form"""
        tips = {
            "Push-ups": [
                "Keep your body in a straight line from head to heels",
                "Lower until elbows reach 90 degrees",
                "Push through your palms, not fingertips",
                "Engage your core throughout the movement"
            ],
            "Squats": [
                "Keep your knees aligned with your toes",
                "Lower until thighs are parallel to ground",
                "Keep your chest up and back straight",
                "Drive through your heels when standing up"
            ],
            "Bicep Curls": [
                "Keep elbows close to your sides",
                "Control both the lifting and lowering phases",
                "Don't swing or use momentum",
                "Squeeze at the top of the movement"
            ],
            "Plank Hold": [
                "Keep your body in a straight line",
                "Don't let your hips sag or pike up",
                "Keep shoulders directly over elbows",
                "Breathe steadily throughout the hold"
            ],
            "Crunches": [
                "Keep your lower back pressed to the floor",
                "Lift your shoulders, not your head",
                "Keep knees bent at 90 degrees",
                "Focus on squeezing your abs"
            ],
            "Sit-ups": [
                "Keep your feet flat on the ground",
                "Use your abs, not momentum",
                "Come up to touch your knees",
                "Lower down with control"
            ],
            "Pull-ups": [
                "Start from a dead hang position",
                "Pull until chin clears the bar",
                "Lower with control, don't drop",
                "Engage your lats and back muscles"
            ],
            "Russian Twists": [
                "Lean back at 45 degrees",
                "Keep your feet off the ground",
                "Rotate from your core, not arms",
                "Touch the ground on each side"
            ],
            "Jumping Jacks": [
                "Jump feet apart while raising arms overhead",
                "Land softly on the balls of your feet",
                "Keep your core engaged",
                "Maintain a steady rhythm"
            ]
        }
        
        return tips.get(exercise_name, ["Focus on proper form", "Move with control"])
    
    @staticmethod
    def detect_common_mistakes(exercise_name, landmarks, angles):
        """Detect common form mistakes for each exercise"""
        mistakes = []
        
        if exercise_name == "Push-ups":
            # Check for sagging hips
            if 'body_alignment' in angles and angles['body_alignment'] < 160:
                mistakes.append("Hips are sagging - engage your core")
            
            # Check for incomplete range of motion
            if 'left_elbow' in angles and 'right_elbow' in angles:
                avg_elbow = (angles['left_elbow'] + angles['right_elbow']) / 2
                if avg_elbow > 120:
                    mistakes.append("Lower down more for full range of motion")
        
        elif exercise_name == "Squats":
            # Check for knee valgus
            is_valgus, _ = ExerciseHelpers.check_knee_valgus(landmarks)
            if is_valgus:
                mistakes.append("Knees are caving in - push them out")
            
            # Check depth
            if 'left_knee' in angles and 'right_knee' in angles:
                avg_knee = (angles['left_knee'] + angles['right_knee']) / 2
                if avg_knee > 120:
                    mistakes.append("Squat deeper - aim for 90 degrees")
        
        elif exercise_name == "Bicep Curls":
            # Check for elbow movement
            if 'left_elbow' in landmarks and 'left_shoulder' in landmarks:
                elbow_drift = abs(landmarks['left_elbow']['x'] - landmarks['left_shoulder']['x'])
                if elbow_drift > 50:
                    mistakes.append("Keep elbows stationary at your sides")
        
        return mistakes if mistakes else ["Good form!"]