import streamlit as st
import cv2
import numpy as np
import mediapipe as mp
from utils.pose_detector import PoseDetector
from utils.exercise_detector import ExerciseDetector
from utils.ui_components import UIComponents
from utils.exercise_helpers import ExerciseHelpers
from config.exercise_config import EXERCISE_CONFIG
import time

# Page configuration
st.set_page_config(
    page_title="AI Posture Detection - Enhanced",
    page_icon="🏋️",
    layout="wide"
)

def main():
    st.title("🏋️ AI Posture Detection & Form Checker - Enhanced Edition")
    
    # Sidebar for exercise selection and settings
    st.sidebar.title("Exercise Selection")
    exercise = st.sidebar.selectbox(
        "Choose Exercise:",
        ["Push-ups", "Squats", "Bicep Curls", "Plank Hold", "Crunches", "Sit-ups", "Pull-ups", "Russian Twists", "Jumping Jacks"]
    )
    
    # Display exercise info
    if exercise in EXERCISE_CONFIG:
        with st.sidebar.expander("Exercise Tips"):
            tips = ExerciseHelpers.get_exercise_tips(exercise)
            for tip in tips:
                st.write(f"• {tip}")
    
    # Advanced settings
    st.sidebar.title("Settings")
    confidence_threshold = st.sidebar.slider("Detection Confidence", 0.1, 1.0, 0.5, 0.1)
    show_angles = st.sidebar.checkbox("Show Angle Measurements", True)
    show_skeleton = st.sidebar.checkbox("Show Pose Skeleton", True)
    
    # Initialize components
    pose_detector = PoseDetector()
    exercise_detector = ExerciseDetector()
    ui_components = UIComponents()
    
    # Create columns for layout
    col1, col2 = st.columns([3, 1])
    
    with col1:
        # Video display placeholder
        video_placeholder = st.empty()
        # Exercise name display
        exercise_name_placeholder = st.empty()
        
    with col2:
        # Stats display
        st.subheader("📊 Statistics")
        reps_placeholder = st.empty()
        sets_placeholder = st.empty()
        status_placeholder = st.empty()
        feedback_placeholder = st.empty()
        
        # Additional metrics
        st.subheader("📈 Performance")
        form_accuracy_placeholder = st.empty()
        current_angle_placeholder = st.empty()
        
        # Control buttons
        start_button = st.button("🎥 Start Camera", type="primary")
        stop_button = st.button("⏹️ Stop Camera", type="secondary")
        reset_button = st.button("🔄 Reset Counter")
        
        # Exercise switch buttons
        st.subheader("Quick Switch")
        col_a, col_b = st.columns(2)
        with col_a:
            if st.button("Push-ups"):
                st.session_state.selected_exercise = "Push-ups"
            if st.button("Squats"):
                st.session_state.selected_exercise = "Squats"
            if st.button("Crunches"):
                st.session_state.selected_exercise = "Crunches"
        with col_b:
            if st.button("Bicep Curls"):
                st.session_state.selected_exercise = "Bicep Curls"
            if st.button("Pull-ups"):
                st.session_state.selected_exercise = "Pull-ups"
            if st.button("Jumping Jacks"):
                st.session_state.selected_exercise = "Jumping Jacks"
    
    # Initialize session state
    if 'camera_active' not in st.session_state:
        st.session_state.camera_active = False
    if 'reps' not in st.session_state:
        st.session_state.reps = 0
    if 'sets' not in st.session_state:
        st.session_state.sets = 0
    if 'form_accuracy_history' not in st.session_state:
        st.session_state.form_accuracy_history = []
    if 'selected_exercise' not in st.session_state:
        st.session_state.selected_exercise = exercise
    
    # Update exercise if changed via quick switch
    if 'selected_exercise' in st.session_state:
        exercise = st.session_state.selected_exercise
    
    # Handle button clicks
    if start_button:
        st.session_state.camera_active = True
    if stop_button:
        st.session_state.camera_active = False
    if reset_button:
        st.session_state.reps = 0
        st.session_state.sets = 0
        st.session_state.form_accuracy_history = []
    
    # Display current exercise
    with exercise_name_placeholder.container():
        st.markdown(f"### Current Exercise: **{exercise}**")
    
    # Camera processing
    if st.session_state.camera_active:
        cap = cv2.VideoCapture(0)
        
        if not cap.isOpened():
            st.error("Could not open camera. Please check your webcam connection.")
            return
        
        # Set camera properties for better performance
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        cap.set(cv2.CAP_PROP_FPS, 30)
        
        frame_count = 0
        
        while st.session_state.camera_active:
            ret, frame = cap.read()
            if not ret:
                st.error("Failed to read from camera")
                break
            
            frame_count += 1
            
            # Flip frame horizontally for mirror effect
            frame = cv2.flip(frame, 1)
            
            # Detect pose
            results = pose_detector.detect_pose(frame)
            
            if results.pose_landmarks:
                # Extract landmarks
                landmarks = pose_detector.extract_landmarks(results.pose_landmarks, frame.shape)
                
                # Validate landmarks for current exercise
                is_valid, validation_msg = ExerciseHelpers.validate_landmarks(exercise, landmarks)
                
                if is_valid:
                    # Draw pose skeleton if enabled
                    if show_skeleton:
                        annotated_frame = ui_components.draw_pose_skeleton(frame, landmarks)
                    else:
                        annotated_frame = frame.copy()
                    
                    # Detect exercise and get feedback
                    exercise_data = exercise_detector.detect_exercise(exercise, landmarks)
                    
                    # Update rep count
                    if exercise_data['rep_completed']:
                        st.session_state.reps += 1
                        if st.session_state.reps % 10 == 0:  # New set every 10 reps
                            st.session_state.sets += 1
                    
                    # Track form accuracy
                    st.session_state.form_accuracy_history.append(1 if exercise_data['correct_form'] else 0)
                    if len(st.session_state.form_accuracy_history) > 30:  # Keep last 30 frames
                        st.session_state.form_accuracy_history.pop(0)
                    
                    # Draw angles if enabled
                    if show_angles and exercise_data['angles']:
                        annotated_frame = ui_components.draw_angles(annotated_frame, exercise_data['angles'])
                    
                    # Draw feedback
                    annotated_frame = ui_components.draw_feedback(annotated_frame, exercise_data)
                    
                    # Draw rep counter on frame
                    annotated_frame = ui_components.draw_rep_counter(
                        annotated_frame, st.session_state.reps, st.session_state.sets
                    )
                    
                    # Update UI metrics
                    with reps_placeholder.container():
                        st.metric("Reps", st.session_state.reps)
                    
                    with sets_placeholder.container():
                        st.metric("Sets", st.session_state.sets)
                    
                    with status_placeholder.container():
                        if exercise_data['correct_form']:
                            st.success("✅ Correct Form")
                        else:
                            st.error("❌ Incorrect Form")
                    
                    with feedback_placeholder.container():
                        st.info(f"💡 {exercise_data['feedback']}")
                    
                    # Form accuracy percentage
                    if st.session_state.form_accuracy_history:
                        accuracy = np.mean(st.session_state.form_accuracy_history) * 100
                        with form_accuracy_placeholder.container():
                            st.metric("Form Accuracy", f"{accuracy:.1f}%")
                    
                    # Display current key angles
                    if exercise_data['angles']:
                        angle_text = []
                        for angle_name, angle_value in exercise_data['angles'].items():
                            if isinstance(angle_value, (int, float)):
                                angle_text.append(f"{angle_name}: {angle_value:.1f}°")
                        
                        with current_angle_placeholder.container():
                            st.text("\n".join(angle_text))
                
                else:
                    annotated_frame = frame
                    with feedback_placeholder.container():
                        st.warning(f"⚠️ {validation_msg}")
            
            else:
                annotated_frame = frame
                with feedback_placeholder.container():
                    st.warning("⚠️ No pose detected. Please ensure you're visible in the camera.")
            
            # Convert BGR to RGB for Streamlit
            annotated_frame_rgb = cv2.cvtColor(annotated_frame, cv2.COLOR_BGR2RGB)
            
            # Display frame
            video_placeholder.image(annotated_frame_rgb, channels="RGB", use_column_width=True)
            
            # Process every few frames to reduce CPU load
            if frame_count % 3 == 0:
                time.sleep(0.01)
        
        cap.release()
    
    # Display summary when camera is off
    else:
        st.info("Click 'Start Camera' to begin pose detection")
        
        # Show exercise configuration
        if exercise in EXERCISE_CONFIG:
            with st.expander(f"📋 {exercise} Configuration"):
                config = EXERCISE_CONFIG[exercise]
                st.write("**Required Body Parts:**")
                for landmark in config['required_landmarks']:
                    st.write(f"• {landmark.replace('_', ' ').title()}")
                
                st.write("**Angle Thresholds:**")
                for threshold, value in config['angle_thresholds'].items():
                    if isinstance(value, (int, float)):
                        st.write(f"• {threshold.replace('_', ' ').title()}: {value}°")
                    else:
                        st.write(f"• {threshold.replace('_', ' ').title()}: {value}")

if __name__ == "__main__":
    main()