import streamlit as st
import cv2
import numpy as np
import mediapipe as mp
from utils.pose_detector import PoseDetector
from utils.exercise_detector import ExerciseDetector
from utils.ui_components import UIComponents
import time

# Page configuration
st.set_page_config(
    page_title="AI Posture Detection",
    page_icon="🏋️",
    layout="wide"
)

def main():
    st.title("🏋️ AI Posture Detection & Form Checker")
    
    # Sidebar for exercise selection
    st.sidebar.title("Exercise Selection")
    exercise = st.sidebar.selectbox(
        "Choose Exercise:",
        ["Push-ups", "Squats", "Bicep Curls", "Plank Hold", "Crunches", "Sit-ups", "Pull-ups", "Russian Twists", "Jumping Jacks"]
    )
    
    # Initialize components
    pose_detector = PoseDetector()
    exercise_detector = ExerciseDetector()
    ui_components = UIComponents()
    
    # Create columns for layout
    col1, col2 = st.columns([3, 1])
    
    with col1:
        # Video display placeholder
        video_placeholder = st.empty()
    
    with col2:
        # Stats display
        st.subheader("📊 Statistics")
        reps_placeholder = st.empty()
        sets_placeholder = st.empty()
        status_placeholder = st.empty()
        feedback_placeholder = st.empty()
        
        # Control buttons
        start_button = st.button("🎥 Start Camera", type="primary")
        stop_button = st.button("⏹️ Stop Camera", type="secondary")
        reset_button = st.button("🔄 Reset Counter")
    
    # Initialize session state
    if 'camera_active' not in st.session_state:
        st.session_state.camera_active = False
    if 'reps' not in st.session_state:
        st.session_state.reps = 0
    if 'sets' not in st.session_state:
        st.session_state.sets = 0
    
    # Handle button clicks
    if start_button:
        st.session_state.camera_active = True
    if stop_button:
        st.session_state.camera_active = False
    if reset_button:
        st.session_state.reps = 0
        st.session_state.sets = 0
    
    # Camera processing
    if st.session_state.camera_active:
        cap = cv2.VideoCapture(0)
        
        if not cap.isOpened():
            st.error("Could not open camera. Please check your webcam connection.")
            return
        
        # Set camera properties
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        
        while st.session_state.camera_active:
            ret, frame = cap.read()
            if not ret:
                st.error("Failed to read from camera")
                break
            
            # Flip frame horizontally for mirror effect
            frame = cv2.flip(frame, 1)
            
            # Detect pose
            results = pose_detector.detect_pose(frame)
            
            if results.pose_landmarks:
                # Extract landmarks
                landmarks = pose_detector.extract_landmarks(results.pose_landmarks, frame.shape)
                
                # Draw pose skeleton
                annotated_frame = ui_components.draw_pose_skeleton(frame, landmarks)
                
                # Detect exercise and get feedback
                exercise_data = exercise_detector.detect_exercise(exercise, landmarks)
                
                # Update rep count
                if exercise_data['rep_completed']:
                    st.session_state.reps += 1
                    if st.session_state.reps % 10 == 0:  # New set every 10 reps
                        st.session_state.sets += 1
                
                # Draw angles and feedback
                annotated_frame = ui_components.draw_angles(annotated_frame, exercise_data['angles'])
                annotated_frame = ui_components.draw_feedback(annotated_frame, exercise_data)
                
                # Update UI
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
            
            else:
                annotated_frame = frame
                with feedback_placeholder.container():
                    st.warning("⚠️ No pose detected. Please ensure you're visible in the camera.")
            
            # Convert BGR to RGB for Streamlit
            annotated_frame_rgb = cv2.cvtColor(annotated_frame, cv2.COLOR_BGR2RGB)
            
            # Display frame
            video_placeholder.image(annotated_frame_rgb, channels="RGB", use_column_width=True)
            
            # Small delay to prevent excessive CPU usage
            time.sleep(0.01)
        
        cap.release()

if __name__ == "__main__":
    main()