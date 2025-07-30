import numpy as np
from typing import Dict, List, Tuple, Optional

class AsanaDetector:
    def __init__(self):
        # Define angle thresholds for each asana
        self.asana_criteria = {
            "Pranamasana": {
                "description": "Prayer pose - hands together at chest",
                "angles": {
                    "left_elbow": (60, 120),
                    "right_elbow": (60, 120),
                    "left_shoulder": (45, 135),
                    "right_shoulder": (45, 135),
                    "spine": (150, 180)
                },
                "special_checks": ["hands_together", "upright_posture"]
            },
            
            "Hasta Uttanasana": {
                "description": "Raised arms pose - arms up overhead",
                "angles": {
                    "left_elbow": (150, 180),
                    "right_elbow": (150, 180),
                    "left_shoulder": (160, 180),
                    "right_shoulder": (160, 180),
                    "spine": (150, 180)
                },
                "special_checks": ["arms_overhead", "upright_posture"]
            },
            
            "Padahastasana": {
                "description": "Hand to foot pose - forward fold",
                "angles": {
                    "left_knee": (160, 180),
                    "right_knee": (160, 180),
                    "left_hip": (45, 90),
                    "right_hip": (45, 90),
                    "spine": (45, 90)
                },
                "special_checks": ["forward_fold", "straight_legs"]
            },
            
            "Ashwa Sanchalanasana": {
                "description": "Equestrian pose - lunge position",
                "angles": {
                    "left_knee": (80, 110),  # Front leg bent
                    "right_knee": (150, 180),  # Back leg straight
                    "left_hip": (80, 120),
                    "spine": (120, 160)
                },
                "special_checks": ["lunge_position", "back_leg_straight"]
            },
            
            "Dandasana": {
                "description": "Stick pose - plank position",
                "angles": {
                    "left_elbow": (160, 180),
                    "right_elbow": (160, 180),
                    "left_knee": (160, 180),
                    "right_knee": (160, 180),
                    "spine": (160, 180)
                },
                "special_checks": ["plank_position", "straight_body"]
            },
            
            "Ashtanga Namaskara": {
                "description": "Eight-limbed salutation",
                "angles": {
                    "left_elbow": (80, 120),
                    "right_elbow": (80, 120),
                    "left_knee": (80, 120),
                    "right_knee": (80, 120),
                    "spine": (120, 160)
                },
                "special_checks": ["knees_chest_chin_down"]
            },
            
            "Bhujangasana": {
                "description": "Cobra pose - chest up, hips down",
                "angles": {
                    "left_elbow": (120, 160),
                    "right_elbow": (120, 160),
                    "left_knee": (160, 180),
                    "right_knee": (160, 180),
                    "spine": (120, 160)
                },
                "special_checks": ["cobra_arch", "hips_down"]
            },
            
            "Adho Mukha Svanasana": {
                "description": "Downward dog - inverted V shape",
                "angles": {
                    "left_elbow": (160, 180),
                    "right_elbow": (160, 180),
                    "left_knee": (160, 180),
                    "right_knee": (160, 180),
                    "left_hip": (45, 90),
                    "right_hip": (45, 90)
                },
                "special_checks": ["inverted_v", "straight_limbs"]
            }
        }
    
    def detect_asana(self, asana_name, angles, landmarks):
        """
        Detect if current pose matches the specified asana
        Returns: (is_correct: bool, feedback: str)
        """
        if asana_name not in self.asana_criteria:
            return False, f"Unknown asana: {asana_name}"
        
        criteria = self.asana_criteria[asana_name]
        feedback_messages = []
        angle_matches = 0
        total_angles = len(criteria["angles"])
        
        # Check angle criteria
        for joint, (min_angle, max_angle) in criteria["angles"].items():
            if joint in angles:
                current_angle = angles[joint]
                if min_angle <= current_angle <= max_angle:
                    angle_matches += 1
                else:
                    feedback_messages.append(self._get_angle_feedback(joint, current_angle, min_angle, max_angle))
        
        # Check special pose-specific criteria
        special_checks_passed = 0
        total_special_checks = len(criteria["special_checks"])
        
        for check in criteria["special_checks"]:
            check_passed, check_feedback = self._perform_special_check(check, landmarks, angles)
            if check_passed:
                special_checks_passed += 1
            else:
                feedback_messages.append(check_feedback)
        
        # Determine if pose is correct (80% of criteria must be met)
        angle_score = angle_matches / total_angles if total_angles > 0 else 1.0
        special_score = special_checks_passed / total_special_checks if total_special_checks > 0 else 1.0
        
        overall_score = (angle_score + special_score) / 2
        is_correct = overall_score >= 0.8
        
        # Generate feedback message
        if is_correct:
            feedback = f"Good {asana_name}!"
        else:
            feedback = " | ".join(feedback_messages[:2])  # Show top 2 issues
        
        return is_correct, feedback
    
    def _get_angle_feedback(self, joint, current_angle, min_angle, max_angle):
        """Generate feedback for incorrect joint angles"""
        joint_name = joint.replace("_", " ").title()
        
        if current_angle < min_angle:
            if "elbow" in joint:
                return f"Bend {joint_name} more"
            elif "knee" in joint:
                return f"Bend {joint_name} more"
            else:
                return f"Increase {joint_name} angle"
        else:
            if "elbow" in joint:
                return f"Straighten {joint_name}"
            elif "knee" in joint:
                return f"Straighten {joint_name}"
            else:
                return f"Decrease {joint_name} angle"
    
    def _perform_special_check(self, check_name, landmarks, angles):
        """Perform special pose-specific checks"""
        try:
            if check_name == "hands_together":
                # Check if hands are close together (for prayer pose)
                left_wrist = landmarks[15]
                right_wrist = landmarks[16]
                distance = np.linalg.norm(left_wrist[:2] - right_wrist[:2])
                if distance < 0.1:  # Normalized coordinates
                    return True, ""
                return False, "Bring hands together"
            
            elif check_name == "upright_posture":
                # Check if person is standing upright
                head = landmarks[0]
                hip_center = (landmarks[23] + landmarks[24]) / 2
                if abs(head[0] - hip_center[0]) < 0.1:  # Vertically aligned
                    return True, ""
                return False, "Stand upright"
            
            elif check_name == "arms_overhead":
                # Check if arms are raised overhead
                left_wrist = landmarks[15]
                right_wrist = landmarks[16]
                head = landmarks[0]
                if left_wrist[1] < head[1] and right_wrist[1] < head[1]:  # Y decreases upward
                    return True, ""
                return False, "Raise arms overhead"
            
            elif check_name == "forward_fold":
                # Check if torso is folded forward
                head = landmarks[0]
                hip_center = (landmarks[23] + landmarks[24]) / 2
                if head[1] > hip_center[1]:  # Head below hips
                    return True, ""
                return False, "Fold forward more"
            
            elif check_name == "straight_legs":
                # Check if legs are straight
                left_knee_angle = angles.get("left_knee", 0)
                right_knee_angle = angles.get("right_knee", 0)
                if left_knee_angle > 160 and right_knee_angle > 160:
                    return True, ""
                return False, "Straighten legs"
            
            elif check_name == "lunge_position":
                # Check for proper lunge stance
                left_ankle = landmarks[27]
                right_ankle = landmarks[31] if len(landmarks) > 31 else landmarks[28]
                stance_width = abs(left_ankle[0] - right_ankle[0])
                if stance_width > 0.3:  # Wide stance
                    return True, ""
                return False, "Widen lunge stance"
            
            elif check_name == "back_leg_straight":
                # Check if back leg is extended
                right_knee_angle = angles.get("right_knee", 0)
                if right_knee_angle > 150:
                    return True, ""
                return False, "Straighten back leg"
            
            elif check_name == "plank_position":
                # Check for proper plank alignment
                shoulders = (landmarks[11] + landmarks[12]) / 2
                hips = (landmarks[23] + landmarks[24]) / 2
                ankles = (landmarks[27] + landmarks[28]) / 2
                
                # Check if body is in straight line
                shoulder_hip_diff = abs(shoulders[1] - hips[1])
                hip_ankle_diff = abs(hips[1] - ankles[1])
                
                if shoulder_hip_diff < 0.1 and hip_ankle_diff < 0.1:
                    return True, ""
                return False, "Align body in straight line"
            
            elif check_name == "straight_body":
                # General straight body check
                return self._perform_special_check("plank_position", landmarks, angles)
            
            elif check_name == "knees_chest_chin_down":
                # Check for eight-limbed pose
                chest = (landmarks[11] + landmarks[12]) / 2
                knees = (landmarks[25] + landmarks[26]) / 2
                
                # Both should be relatively low
                if chest[1] > 0.6 and knees[1] > 0.7:  # Lower values mean higher position
                    return True, ""
                return False, "Lower chest and knees"
            
            elif check_name == "cobra_arch":
                # Check for cobra back arch
                head = landmarks[0]
                shoulders = (landmarks[11] + landmarks[12]) / 2
                if head[1] < shoulders[1]:  # Head above shoulders
                    return True, ""
                return False, "Lift chest higher"
            
            elif check_name == "hips_down":
                # Check if hips are down (for cobra)
                hips = (landmarks[23] + landmarks[24]) / 2
                if hips[1] > 0.7:  # Hips relatively low
                    return True, ""
                return False, "Keep hips down"
            
            elif check_name == "inverted_v":
                # Check for downward dog V-shape
                head = landmarks[0]
                hips = (landmarks[23] + landmarks[24]) / 2
                hands = (landmarks[15] + landmarks[16]) / 2
                feet = (landmarks[27] + landmarks[28]) / 2
                
                # Hips should be highest point
                if hips[1] < head[1] and hips[1] < hands[1] and hips[1] < feet[1]:
                    return True, ""
                return False, "Lift hips higher"
            
            elif check_name == "straight_limbs":
                # Check if arms and legs are straight
                limb_angles = ["left_elbow", "right_elbow", "left_knee", "right_knee"]
                straight_count = 0
                for angle_name in limb_angles:
                    if angle_name in angles and angles[angle_name] > 150:
                        straight_count += 1
                
                if straight_count >= 3:  # Most limbs straight
                    return True, ""
                return False, "Straighten arms and legs"
            
            else:
                return True, ""  # Unknown check passes by default
                
        except Exception as e:
            print(f"Error in special check {check_name}: {e}")
            return False, f"Check {check_name} failed"
    
    def get_asana_description(self, asana_name):
        """Get description of the asana"""
        if asana_name in self.asana_criteria:
            return self.asana_criteria[asana_name]["description"]
        return "Unknown asana"