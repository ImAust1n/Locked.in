"""
Exercise configuration file containing thresholds and parameters for each exercise
"""

# Exercise-specific angle thresholds and parameters
EXERCISE_CONFIG = {
    'Push-ups': {
        'required_landmarks': ['left_shoulder', 'left_elbow', 'left_wrist', 
                             'right_shoulder', 'right_elbow', 'right_wrist',
                             'left_hip', 'right_hip'],
        'angle_thresholds': {
            'down_position': 90,  # Degrees
            'up_position': 150,
            'body_alignment_min': 160,
            'body_alignment_max': 200
        },
        'rep_states': ['up', 'down'],
        'form_tips': {
            'body_alignment': "Keep your body straight - avoid sagging hips",
            'elbow_angle': "Lower down more - bend elbows to 90 degrees",
            'good_form': "Good form!"
        }
    },
    
    'Squats': {
        'required_landmarks': ['left_hip', 'left_knee', 'left_ankle',
                             'right_hip', 'right_knee', 'right_ankle'],
        'angle_thresholds': {
            'down_position': 90,
            'up_position': 160,
            'knee_valgus_ratio': 0.7  # Knee distance / hip distance
        },
        'rep_states': ['up', 'down'],
        'form_tips': {
            'depth': "Squat down - bend knees to 90 degrees",
            'knee_alignment': "Keep knees aligned with toes - don't let them cave in",
            'good_depth': "Great depth! Now stand up"
        }
    },
    
    'Bicep Curls': {
        'required_landmarks': ['left_shoulder', 'left_elbow', 'left_wrist',
                             'right_shoulder', 'right_elbow', 'right_wrist'],
        'angle_thresholds': {
            'contracted_position': 50,
            'extended_position': 140,
            'elbow_stability_threshold': 50  # Max horizontal elbow movement
        },
        'rep_states': ['down', 'up'],
        'form_tips': {
            'contraction': "Full contraction - great! Now lower slowly",
            'elbow_stability': "Keep elbows close to your body - don't swing",
            'range_of_motion': "Continue curling up"
        }
    },
    
    'Plank Hold': {
        'required_landmarks': ['left_shoulder', 'left_hip', 'left_knee',
                             'right_shoulder', 'right_hip', 'right_knee'],
        'angle_thresholds': {
            'ideal_alignment_min': 170,
            'ideal_alignment_max': 190,
            'sag_threshold': 160,
            'pike_threshold': 200
        },
        'rep_states': ['holding'],
        'form_tips': {
            'sag': "Raise your hips - avoid sagging",
            'pike': "Lower your hips - keep body straight",
            'perfect': "Perfect plank position! Hold it!"
        }
    },
    
    'Crunches': {
        'required_landmarks': ['left_shoulder', 'left_hip', 'left_knee',
                             'right_shoulder', 'right_hip', 'right_knee'],
        'angle_thresholds': {
            'contracted_position': 130,
            'extended_position': 155,
            'knee_bend_min': 70,
            'knee_bend_max': 120
        },
        'rep_states': ['down', 'up'],
        'form_tips': {
            'contraction': "Great crunch! Feel the squeeze, now lower",
            'knee_position': "Keep knees bent at 90 degrees",
            'range': "Lift your shoulders off the ground"
        }
    },
    
    'Sit-ups': {
        'required_landmarks': ['left_shoulder', 'left_hip', 'left_knee',
                             'right_shoulder', 'right_hip', 'right_knee'],
        'angle_thresholds': {
            'full_up_position': 60,
            'down_position': 150,
            'mid_range': 90
        },
        'rep_states': ['down', 'up'],
        'form_tips': {
            'full_range': "Full sit-up! Touch your knees, now lower",
            'continue_up': "Keep going up - full range of motion",
            'starting': "Starting position - now sit up fully"
        }
    },
    
    'Pull-ups': {
        'required_landmarks': ['left_shoulder', 'left_elbow', 'left_wrist',
                             'right_shoulder', 'right_elbow', 'right_wrist'],
        'angle_thresholds': {
            'up_position': 100,
            'down_position': 150,
            'shoulder_elevation_threshold': 0  # Shoulder above elbow
        },
        'rep_states': ['down', 'up'],
        'form_tips': {
            'chin_over_bar': "Excellent! Chin over bar - now lower",
            'dead_hang': "Dead hang position - now pull up",
            'keep_pulling': "Keep pulling - engage your lats"
        }
    },
    
    'Russian Twists': {
        'required_landmarks': ['left_shoulder', 'right_shoulder', 'left_hip', 'right_hip'],
        'angle_thresholds': {
            'torso_lean_min': 100,
            'torso_lean_max': 140,
            'rotation_threshold': 0.25,  # Percentage of shoulder width
            'center_threshold': 0.5      # Return to center threshold
        },
        'rep_states': ['center', 'twisted'],
        'form_tips': {
            'lean_back': "Lean back at 45 degrees - engage your core",
            'rotate_more': "Twist more - rotate your torso",
            'good_rotation': "Good rotation! Now twist to other side"
        }
    },
    
    'Jumping Jacks': {
        'required_landmarks': ['left_shoulder', 'right_shoulder', 'left_hip', 'right_hip',
                             'left_ankle', 'right_ankle'],
        'angle_thresholds': {
            'feet_apart_ratio': 1.5,  # Feet distance / hip width
            'arms_up_angle': 120,
            'coordination_check': True
        },
        'rep_states': ['feet_together', 'feet_apart'],
        'form_tips': {
            'perfect_jump': "Perfect jump position! Now jump back",
            'raise_arms': "Raise your arms overhead when jumping out",
            'lower_arms': "Lower arms when feet are together"
        }
    }
}

# Color schemes for different feedback types
FEEDBACK_COLORS = {
    'correct': (0, 255, 0),      # Green
    'incorrect': (0, 0, 255),    # Red
    'warning': (0, 255, 255),    # Yellow
    'info': (255, 255, 255)      # White
}

# UI Configuration
UI_CONFIG = {
    'font_scale': 0.7,
    'font_thickness': 2,
    'line_thickness': 3,
    'circle_radius': 8,
    'feedback_box_alpha': 0.7,
    'angle_display_precision': 1  # Decimal places
}