# Configuration settings for Surya Namaskar Detection App

# Camera Settings
CAMERA_INDEX = 0  # Change to 1, 2, etc. if default camera doesn't work
CAMERA_WIDTH = 640
CAMERA_HEIGHT = 480
FLIP_CAMERA = True  # Mirror effect for better user experience

# Detection Settings
MIN_DETECTION_CONFIDENCE = 0.5  # MediaPipe pose detection confidence
MIN_TRACKING_CONFIDENCE = 0.5   # MediaPipe pose tracking confidence
POSE_HOLD_DURATION = 2.0        # Seconds to hold each pose
STABILITY_THRESHOLD = 0.7       # Pose stability requirement (0-1)

# Visual Settings
JOINT_RADIUS = 5               # Size of joint dots
CONNECTION_THICKNESS = 2       # Thickness of skeleton lines
FONT_SCALE = 0.7              # Text size for overlays
FONT_THICKNESS = 2            # Text thickness

# Colors (BGR format for OpenCV)
COLORS = {
    'correct_pose': (0, 255, 0),      # Green
    'incorrect_pose': (0, 0, 255),    # Red  
    'feedback': (255, 255, 0),        # Yellow
    'info': (255, 255, 255),          # White
    'joints': {
        'face': (255, 0, 0),          # Blue
        'upper_body': (0, 255, 0),    # Green
        'hands': (255, 255, 0),       # Cyan
        'lower_body': (0, 0, 255),    # Red
    }
}

# Pose Sequence
SURYA_NAMASKAR_SEQUENCE = [
    "Pranamasana",
    "Hasta Uttanasana", 
    "Padahastasana",
    "Ashwa Sanchalanasana",
    "Dandasana",
    "Ashtanga Namaskara",
    "Bhujangasana",
    "Adho Mukha Svanasana",
    "Ashwa Sanchalanasana",
    "Padahastasana",
    "Hasta Uttanasana",
    "Pranamasana"
]

# Angle Tolerance Settings
ANGLE_TOLERANCE = {
    'strict': 10,    # ±10 degrees
    'normal': 15,    # ±15 degrees  
    'relaxed': 20    # ±20 degrees
}

# Default tolerance level
DEFAULT_TOLERANCE = 'normal'

# Advanced Settings
ENABLE_POSE_SMOOTHING = True       # Smooth pose landmarks over time
SMOOTHING_FACTOR = 0.3             # Higher = more smoothing (0-1)
ENABLE_ANGLE_DISPLAY = True        # Show joint angles on screen
ENABLE_DEBUG_MODE = False          # Show additional debug info
AUTO_ADVANCE_ON_CORRECT = True     # Auto advance to next pose when correct

# Performance Settings
MAX_FPS = 30                       # Limit FPS to reduce CPU usage
SKIP_FRAME_COUNT = 0               # Skip frames for performance (0 = process all)

# UI Settings (for Streamlit)
STREAMLIT_CONFIG = {
    'page_title': 'Surya Namaskar Detection',
    'page_icon': '🧘',
    'layout': 'wide',
    'sidebar_width': 300
}

# UI Settings (for Desktop App)
DESKTOP_CONFIG = {
    'window_title': 'Surya Namaskar Detection App',
    'window_size': '1200x800',
    'camera_display_width': 640,
    'update_interval_ms': 33  # ~30 FPS
}

# Pose Detection Landmarks (MediaPipe indices)
LANDMARK_INDICES = {
    'nose': 0,
    'left_eye_inner': 1, 'left_eye': 2, 'left_eye_outer': 3,
    'right_eye_inner': 4, 'right_eye': 5, 'right_eye_outer': 6,
    'left_ear': 7, 'right_ear': 8,
    'mouth_left': 9, 'mouth_right': 10,
    'left_shoulder': 11, 'right_shoulder': 12,
    'left_elbow': 13, 'right_elbow': 14,
    'left_wrist': 15, 'right_wrist': 16,
    'left_pinky': 17, 'right_pinky': 18,
    'left_index': 19, 'right_index': 20,
    'left_thumb': 21, 'right_thumb': 22,
    'left_hip': 23, 'right_hip': 24,
    'left_knee': 25, 'right_knee': 26,
    'left_ankle': 27, 'right_ankle': 28,
    'left_heel': 29, 'right_heel': 30,
    'left_foot_index': 31, 'right_foot_index': 32
}

# Validation Settings
POSE_VALIDATION = {
    'min_landmarks': 33,           # Minimum landmarks required
    'max_missing_joints': 3,       # Max missing key joints allowed
    'position_bounds': (0, 1),     # Normalized coordinate bounds
    'min_body_height': 0.3,        # Minimum body height in frame
    'max_body_width': 0.8          # Maximum body width in frame
}

# Audio/Notification Settings (future features)
AUDIO_ENABLED = False
NOTIFICATION_SOUNDS = {
    'pose_correct': 'sounds/correct.wav',
    'pose_incorrect': 'sounds/incorrect.wav', 
    'sequence_complete': 'sounds/complete.wav'
}

# Data Logging (for analysis)
ENABLE_LOGGING = False
LOG_FILE_PATH = 'pose_session.log'
LOG_INTERVAL = 1.0  # Log every N seconds

# Export/Save Settings
ENABLE_SESSION_SAVE = False
SAVE_DIRECTORY = 'sessions/'
VIDEO_RECORDING = False  # Record practice sessions

# Customization for different users
USER_PROFILES = {
    'beginner': {
        'hold_duration': 3.0,
        'tolerance': 'relaxed',
        'feedback_level': 'detailed'
    },
    'intermediate': {
        'hold_duration': 2.0,
        'tolerance': 'normal', 
        'feedback_level': 'standard'
    },
    'advanced': {
        'hold_duration': 1.5,
        'tolerance': 'strict',
        'feedback_level': 'minimal'
    }
}

# Default user profile
DEFAULT_USER_PROFILE = 'intermediate'