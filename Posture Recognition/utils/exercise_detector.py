import numpy as np
from utils.pose_detector import PoseDetector
from utils.exercise_helpers import ExerciseHelpers
from config.exercise_config import EXERCISE_CONFIG

class ExerciseDetector:
    def __init__(self):
        self.pose_detector = PoseDetector()
        self.rep_state = {
            "push_up": "up", "squat": "up", "bicep_curl": "down", "plank": "holding",
            "crunch": "down", "situp": "down", "pullup": "down", "russian_twist": "center", "jumping_jack": "feet_together"
        }
        self.rep_count = {
            "push_up": 0, "squat": 0, "bicep_curl": 0, "plank": 0,
            "crunch": 0, "situp": 0, "pullup": 0, "russian_twist": 0, "jumping_jack": 0
        }
        self.plank_start_time = None
        
    def detect_exercise(self, exercise_name, landmarks):
        """Main exercise detection method"""
        exercise_map = {
            "Push-ups": self._detect_pushup,
            "Squats": self._detect_squat,
            "Bicep Curls": self._detect_bicep_curl,
            "Plank Hold": self._detect_plank,
            "Crunches": self._detect_crunch,
            "Sit-ups": self._detect_situp,
            "Pull-ups": self._detect_pullup,
            "Russian Twists": self._detect_russian_twist,
            "Jumping Jacks": self._detect_jumping_jack
        }
        
        if exercise_name in exercise_map:
            return exercise_map[exercise_name](landmarks)
        
        return {
            'correct_form': False,
            'feedback': 'Exercise not supported',
            'angles': {},
            'rep_completed': False
        }
    
    def _detect_pushup(self, landmarks):
        """Detect push-up form and count reps"""
        if not all(key in landmarks for key in ['left_shoulder', 'left_elbow', 'left_wrist', 
                                              'right_shoulder', 'right_elbow', 'right_wrist',
                                              'left_hip', 'right_hip']):
            return {
                'correct_form': False,
                'feedback': 'Please ensure your full body is visible',
                'angles': {},
                'rep_completed': False
            }
        
        # Calculate angles
        left_elbow_angle = self.pose_detector.calculate_angle(
            landmarks['left_shoulder'], landmarks['left_elbow'], landmarks['left_wrist']
        )
        right_elbow_angle = self.pose_detector.calculate_angle(
            landmarks['right_shoulder'], landmarks['right_elbow'], landmarks['right_wrist']
        )
        
        # Calculate body alignment (hip-shoulder line)
        left_body_angle = self.pose_detector.calculate_angle(
            landmarks['left_hip'], landmarks['left_shoulder'], landmarks['left_elbow']
        )
        
        angles = {
            'left_elbow': left_elbow_angle,
            'right_elbow': right_elbow_angle,
            'body_alignment': left_body_angle
        }
        
        # Average elbow angle
        avg_elbow_angle = (left_elbow_angle + right_elbow_angle) / 2
        
        # Form validation
        correct_form = True
        feedback = "Good form!"
        
        # Check body alignment (should be relatively straight)
        if left_body_angle < 160 or left_body_angle > 200:
            correct_form = False
            feedback = "Keep your body straight - avoid sagging hips"
        
        # Check if arms are too wide or too narrow
        elif avg_elbow_angle < 45:
            feedback = "Lower down more - bend elbows to 90 degrees"
        elif avg_elbow_angle > 160:
            feedback = "Good position - now lower down"
        
        # Rep counting logic
        rep_completed = False
        if avg_elbow_angle < 90 and self.rep_state["push_up"] == "up":
            self.rep_state["push_up"] = "down"
        elif avg_elbow_angle > 150 and self.rep_state["push_up"] == "down":
            self.rep_state["push_up"] = "up"
            if correct_form:
                rep_completed = True
        
        return {
            'correct_form': correct_form,
            'feedback': feedback,
            'angles': angles,
            'rep_completed': rep_completed
        }
    
    def _detect_squat(self, landmarks):
        """Detect squat form and count reps"""
        if not all(key in landmarks for key in ['left_hip', 'left_knee', 'left_ankle',
                                              'right_hip', 'right_knee', 'right_ankle']):
            return {
                'correct_form': False,
                'feedback': 'Please ensure your legs are fully visible',
                'angles': {},
                'rep_completed': False
            }
        
        # Calculate knee angles
        left_knee_angle = self.pose_detector.calculate_angle(
            landmarks['left_hip'], landmarks['left_knee'], landmarks['left_ankle']
        )
        right_knee_angle = self.pose_detector.calculate_angle(
            landmarks['right_hip'], landmarks['right_knee'], landmarks['right_ankle']
        )
        
        # Calculate hip angle (torso to thigh)
        left_hip_angle = self.pose_detector.calculate_angle(
            landmarks['left_shoulder'], landmarks['left_hip'], landmarks['left_knee']
        ) if 'left_shoulder' in landmarks else 180
        
        angles = {
            'left_knee': left_knee_angle,
            'right_knee': right_knee_angle,
            'left_hip': left_hip_angle
        }
        
        avg_knee_angle = (left_knee_angle + right_knee_angle) / 2
        
        # Form validation
        correct_form = True
        feedback = "Good form!"
        
        if avg_knee_angle < 70:
            feedback = "Great depth! Now stand up"
        elif avg_knee_angle < 90:
            feedback = "Good squat depth"
        elif avg_knee_angle > 160:
            feedback = "Squat down - bend knees to 90 degrees"
        else:
            feedback = "Lower down more for full range"
        
        # Check for knee valgus (knees caving in)
        knee_distance = abs(landmarks['left_knee']['x'] - landmarks['right_knee']['x'])
        hip_distance = abs(landmarks['left_hip']['x'] - landmarks['right_hip']['x'])
        
        if knee_distance < hip_distance * 0.7:
            correct_form = False
            feedback = "Keep knees aligned with toes - don't let them cave in"
        
        # Rep counting
        rep_completed = False
        if avg_knee_angle < 90 and self.rep_state["squat"] == "up":
            self.rep_state["squat"] = "down"
        elif avg_knee_angle > 160 and self.rep_state["squat"] == "down":
            self.rep_state["squat"] = "up"
            if correct_form:
                rep_completed = True
        
        return {
            'correct_form': correct_form,
            'feedback': feedback,
            'angles': angles,
            'rep_completed': rep_completed
        }
    
    def _detect_bicep_curl(self, landmarks):
        """Detect bicep curl form and count reps"""
        if not all(key in landmarks for key in ['left_shoulder', 'left_elbow', 'left_wrist',
                                              'right_shoulder', 'right_elbow', 'right_wrist']):
            return {
                'correct_form': False,
                'feedback': 'Please ensure your arms are fully visible',
                'angles': {},
                'rep_completed': False
            }
        
        # Calculate elbow angles
        left_elbow_angle = self.pose_detector.calculate_angle(
            landmarks['left_shoulder'], landmarks['left_elbow'], landmarks['left_wrist']
        )
        right_elbow_angle = self.pose_detector.calculate_angle(
            landmarks['right_shoulder'], landmarks['right_elbow'], landmarks['right_wrist']
        )
        
        angles = {
            'left_elbow': left_elbow_angle,
            'right_elbow': right_elbow_angle
        }
        
        avg_elbow_angle = (left_elbow_angle + right_elbow_angle) / 2
        
        # Form validation
        correct_form = True
        feedback = "Good form!"
        
        if avg_elbow_angle < 45:
            feedback = "Full contraction - great! Now lower slowly"
        elif avg_elbow_angle < 90:
            feedback = "Good curl - squeeze at the top"
        elif avg_elbow_angle > 160:
            feedback = "Starting position - now curl up"
        else:
            feedback = "Continue curling up"
        
        # Check for elbow stability (elbows should stay close to body)
        left_elbow_x = landmarks['left_elbow']['x']
        left_shoulder_x = landmarks['left_shoulder']['x']
        right_elbow_x = landmarks['right_elbow']['x']
        right_shoulder_x = landmarks['right_shoulder']['x']
        
        if abs(left_elbow_x - left_shoulder_x) > 50 or abs(right_elbow_x - right_shoulder_x) > 50:
            correct_form = False
            feedback = "Keep elbows close to your body - don't swing"
        
        # Rep counting
        rep_completed = False
        if avg_elbow_angle < 50 and self.rep_state["bicep_curl"] == "down":
            self.rep_state["bicep_curl"] = "up"
        elif avg_elbow_angle > 140 and self.rep_state["bicep_curl"] == "up":
            self.rep_state["bicep_curl"] = "down"
            if correct_form:
                rep_completed = True
        
        return {
            'correct_form': correct_form,
            'feedback': feedback,
            'angles': angles,
            'rep_completed': rep_completed
        }
    
    def _detect_plank(self, landmarks):
        """Detect plank form"""
        if not all(key in landmarks for key in ['left_shoulder', 'left_hip', 'left_knee',
                                              'right_shoulder', 'right_hip', 'right_knee']):
            return {
                'correct_form': False,
                'feedback': 'Please ensure your full body is visible',
                'angles': {},
                'rep_completed': False
            }
        
        # Calculate body alignment angles
        left_body_angle = self.pose_detector.calculate_angle(
            landmarks['left_shoulder'], landmarks['left_hip'], landmarks['left_knee']
        )
        right_body_angle = self.pose_detector.calculate_angle(
            landmarks['right_shoulder'], landmarks['right_hip'], landmarks['right_knee']
        )
        
        angles = {
            'left_body': left_body_angle,
            'right_body': right_body_angle
        }
        
        avg_body_angle = (left_body_angle + right_body_angle) / 2
        
        # Form validation
        correct_form = True
        feedback = "Hold steady!"
        
        if avg_body_angle < 160:
            correct_form = False
            feedback = "Lower your hips - keep body straight"
        elif avg_body_angle > 200:
            correct_form = False
            feedback = "Raise your hips - avoid sagging"
        elif 170 <= avg_body_angle <= 190:
            feedback = "Perfect plank position! Hold it!"
        
        # Check shoulder position (should be over wrists/elbows)
        if 'left_wrist' in landmarks and 'left_elbow' in landmarks:
            shoulder_elbow_distance = self.pose_detector.calculate_distance(
                landmarks['left_shoulder'], landmarks['left_elbow']
            )
            if shoulder_elbow_distance > 100:  # Adjust threshold as needed
                correct_form = False
                feedback = "Keep shoulders directly over elbows"
        
        return {
            'correct_form': correct_form,
            'feedback': feedback,
            'angles': angles,
            'rep_completed': False  # Plank is a hold exercise
        }
    
    def _detect_crunch(self, landmarks):
        """Detect crunch form and count reps"""
        if not all(key in landmarks for key in ['left_shoulder', 'left_hip', 'left_knee',
                                              'right_shoulder', 'right_hip', 'right_knee']):
            return {
                'correct_form': False,
                'feedback': 'Please ensure your torso and legs are visible',
                'angles': {},
                'rep_completed': False
            }
        
        # Calculate torso angles
        left_torso_angle = self.pose_detector.calculate_angle(
            landmarks['left_shoulder'], landmarks['left_hip'], landmarks['left_knee']
        )
        right_torso_angle = self.pose_detector.calculate_angle(
            landmarks['right_shoulder'], landmarks['right_hip'], landmarks['right_knee']
        )
        
        # Calculate knee angles (should be bent ~90 degrees)
        left_knee_angle = self.pose_detector.calculate_angle(
            landmarks['left_hip'], landmarks['left_knee'], landmarks['left_ankle']
        ) if 'left_ankle' in landmarks else 90
        
        angles = {
            'left_torso': left_torso_angle,
            'right_torso': right_torso_angle,
            'left_knee': left_knee_angle
        }
        
        avg_torso_angle = (left_torso_angle + right_torso_angle) / 2
        
        # Form validation
        correct_form = True
        feedback = "Good form!"
        
        if avg_torso_angle < 120:
            feedback = "Great crunch! Feel the squeeze, now lower"
        elif avg_torso_angle < 140:
            feedback = "Good contraction - hold briefly"
        elif avg_torso_angle > 160:
            feedback = "Starting position - now crunch up"
        else:
            feedback = "Lift your shoulders off the ground"
        
        # Check knee position (should stay bent)
        if left_knee_angle > 120:
            correct_form = False
            feedback = "Keep knees bent at 90 degrees"
        
        # Rep counting
        rep_completed = False
        if avg_torso_angle < 130 and self.rep_state["crunch"] == "down":
            self.rep_state["crunch"] = "up"
        elif avg_torso_angle > 155 and self.rep_state["crunch"] == "up":
            self.rep_state["crunch"] = "down"
            if correct_form:
                rep_completed = True
        
        return {
            'correct_form': correct_form,
            'feedback': feedback,
            'angles': angles,
            'rep_completed': rep_completed
        }
    
    def _detect_situp(self, landmarks):
        """Detect sit-up form and count reps"""
        if not all(key in landmarks for key in ['left_shoulder', 'left_hip', 'left_knee',
                                              'right_shoulder', 'right_hip', 'right_knee']):
            return {
                'correct_form': False,
                'feedback': 'Please ensure your full body is visible',
                'angles': {},
                'rep_completed': False
            }
        
        # Calculate torso angles (full range of motion)
        left_torso_angle = self.pose_detector.calculate_angle(
            landmarks['left_shoulder'], landmarks['left_hip'], landmarks['left_knee']
        )
        right_torso_angle = self.pose_detector.calculate_angle(
            landmarks['right_shoulder'], landmarks['right_hip'], landmarks['right_knee']
        )
        
        angles = {
            'left_torso': left_torso_angle,
            'right_torso': right_torso_angle
        }
        
        avg_torso_angle = (left_torso_angle + right_torso_angle) / 2
        
        # Form validation
        correct_form = True
        feedback = "Good form!"
        
        if avg_torso_angle < 45:
            feedback = "Full sit-up! Touch your knees, now lower"
        elif avg_torso_angle < 90:
            feedback = "Great range! Continue to knees"
        elif avg_torso_angle > 160:
            feedback = "Starting position - now sit up fully"
        else:
            feedback = "Keep going up - full range of motion"
        
        # Rep counting (full range required)
        rep_completed = False
        if avg_torso_angle < 60 and self.rep_state["situp"] == "down":
            self.rep_state["situp"] = "up"
        elif avg_torso_angle > 150 and self.rep_state["situp"] == "up":
            self.rep_state["situp"] = "down"
            if correct_form:
                rep_completed = True
        
        return {
            'correct_form': correct_form,
            'feedback': feedback,
            'angles': angles,
            'rep_completed': rep_completed
        }
    
    def _detect_pullup(self, landmarks):
        """Detect pull-up form and count reps"""
        if not all(key in landmarks for key in ['left_shoulder', 'left_elbow', 'left_wrist',
                                              'right_shoulder', 'right_elbow', 'right_wrist']):
            return {
                'correct_form': False,
                'feedback': 'Please ensure your arms are fully visible',
                'angles': {},
                'rep_completed': False
            }
        
        # Calculate elbow angles
        left_elbow_angle = self.pose_detector.calculate_angle(
            landmarks['left_shoulder'], landmarks['left_elbow'], landmarks['left_wrist']
        )
        right_elbow_angle = self.pose_detector.calculate_angle(
            landmarks['right_shoulder'], landmarks['right_elbow'], landmarks['right_wrist']
        )
        
        # Calculate shoulder height relative to elbows
        left_shoulder_y = landmarks['left_shoulder']['y']
        left_elbow_y = landmarks['left_elbow']['y']
        shoulder_elevation = left_elbow_y - left_shoulder_y
        
        angles = {
            'left_elbow': left_elbow_angle,
            'right_elbow': right_elbow_angle,
            'shoulder_elevation': shoulder_elevation
        }
        
        avg_elbow_angle = (left_elbow_angle + right_elbow_angle) / 2
        
        # Form validation
        correct_form = True
        feedback = "Good form!"
        
        if avg_elbow_angle < 90 and shoulder_elevation > 0:
            feedback = "Excellent! Chin over bar - now lower"
        elif avg_elbow_angle < 120:
            feedback = "Great pull! Almost there"
        elif avg_elbow_angle > 160:
            feedback = "Dead hang position - now pull up"
        else:
            feedback = "Keep pulling - engage your lats"
        
        # Check for proper dead hang
        if avg_elbow_angle > 160 and shoulder_elevation < -20:
            correct_form = False
            feedback = "Hang with arms extended - shoulders active"
        
        # Rep counting
        rep_completed = False
        if avg_elbow_angle < 100 and shoulder_elevation > 0 and self.rep_state["pullup"] == "down":
            self.rep_state["pullup"] = "up"
        elif avg_elbow_angle > 150 and self.rep_state["pullup"] == "up":
            self.rep_state["pullup"] = "down"
            if correct_form:
                rep_completed = True
        
        return {
            'correct_form': correct_form,
            'feedback': feedback,
            'angles': angles,
            'rep_completed': rep_completed
        }
    
    def _detect_russian_twist(self, landmarks):
        """Detect Russian twist form and count reps"""
        if not all(key in landmarks for key in ['left_shoulder', 'right_shoulder', 'left_hip', 'right_hip']):
            return {
                'correct_form': False,
                'feedback': 'Please ensure your torso is visible',
                'angles': {},
                'rep_completed': False
            }
        
        # Calculate torso rotation (shoulder line vs hip line)
        shoulder_center_x = (landmarks['left_shoulder']['x'] + landmarks['right_shoulder']['x']) / 2
        hip_center_x = (landmarks['left_hip']['x'] + landmarks['right_hip']['x']) / 2
        
        # Calculate shoulder width and rotation
        shoulder_width = abs(landmarks['left_shoulder']['x'] - landmarks['right_shoulder']['x'])
        rotation_offset = abs(shoulder_center_x - hip_center_x)
        
        # Torso angle (should be leaning back)
        torso_angle = self.pose_detector.calculate_angle(
            landmarks['left_shoulder'], landmarks['left_hip'], landmarks['left_knee']
        ) if 'left_knee' in landmarks else 90
        
        angles = {
            'torso_lean': torso_angle,
            'rotation_offset': rotation_offset,
            'shoulder_width': shoulder_width
        }
        
        # Form validation
        correct_form = True
        feedback = "Good form!"
        
        # Check torso lean (should be ~45-60 degrees)
        if torso_angle < 100 or torso_angle > 140:
            correct_form = False
            feedback = "Lean back at 45 degrees - engage your core"
        
        # Check rotation
        if rotation_offset > shoulder_width * 0.3:
            feedback = "Good rotation! Now twist to other side"
        elif rotation_offset < shoulder_width * 0.1:
            feedback = "Twist more - rotate your torso"
        
        # Rep counting (left-center-right-center = 1 rep)
        rep_completed = False
        twist_threshold = shoulder_width * 0.25
        
        if rotation_offset > twist_threshold:
            if self.rep_state["russian_twist"] == "center":
                self.rep_state["russian_twist"] = "twisted"
        elif rotation_offset < twist_threshold * 0.5:
            if self.rep_state["russian_twist"] == "twisted":
                self.rep_state["russian_twist"] = "center"
                if correct_form:
                    rep_completed = True
        
        return {
            'correct_form': correct_form,
            'feedback': feedback,
            'angles': angles,
            'rep_completed': rep_completed
        }
    
    def _detect_jumping_jack(self, landmarks):
        """Detect jumping jack form and count reps"""
        if not all(key in landmarks for key in ['left_shoulder', 'right_shoulder', 'left_hip', 'right_hip',
                                              'left_ankle', 'right_ankle']):
            return {
                'correct_form': False,
                'feedback': 'Please ensure your full body is visible',
                'angles': {},
                'rep_completed': False
            }
        
        # Calculate feet distance
        feet_distance = abs(landmarks['left_ankle']['x'] - landmarks['right_ankle']['x'])
        hip_width = abs(landmarks['left_hip']['x'] - landmarks['right_hip']['x'])
        
        # Calculate arm position (should go up and down)
        left_arm_angle = self.pose_detector.calculate_angle(
            landmarks['left_hip'], landmarks['left_shoulder'], landmarks['left_elbow']
        ) if 'left_elbow' in landmarks else 90
        
        right_arm_angle = self.pose_detector.calculate_angle(
            landmarks['right_hip'], landmarks['right_shoulder'], landmarks['right_elbow']
        ) if 'right_elbow' in landmarks else 90
        
        angles = {
            'feet_distance': feet_distance,
            'left_arm': left_arm_angle,
            'right_arm': right_arm_angle
        }
        
        avg_arm_angle = (left_arm_angle + right_arm_angle) / 2
        
        # Form validation
        correct_form = True
        feedback = "Good form!"
        
        # Check if feet are apart and arms are up
        feet_apart = feet_distance > hip_width * 1.5
        arms_up = avg_arm_angle > 120
        
        if feet_apart and arms_up:
            feedback = "Perfect jump position! Now jump back"
        elif feet_apart and not arms_up:
            correct_form = False
            feedback = "Raise your arms overhead when jumping out"
        elif not feet_apart and arms_up:
            correct_form = False
            feedback = "Lower arms when feet are together"
        else:
            feedback = "Starting position - now jump out"
        
        # Rep counting
        rep_completed = False
        if feet_apart and arms_up and self.rep_state["jumping_jack"] == "feet_together":
            self.rep_state["jumping_jack"] = "feet_apart"
        elif not feet_apart and not arms_up and self.rep_state["jumping_jack"] == "feet_apart":
            self.rep_state["jumping_jack"] = "feet_together"
            if correct_form:
                rep_completed = True
        
        return {
            'correct_form': correct_form,
            'feedback': feedback,
            'angles': angles,
            'rep_completed': rep_completed
        }