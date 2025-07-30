"""
Script to create demo images showing the UI layout and features
This script creates placeholder images that demonstrate the app's interface
"""
import cv2
import numpy as np

def create_demo_ui():
    """Create a demo image showing the app's UI layout"""
    
    # Create a canvas
    width, height = 1200, 800
    canvas = np.zeros((height, width, 3), dtype=np.uint8)
    
    # Background color (dark theme)
    canvas[:] = (40, 40, 40)
    
    # Title area
    cv2.rectangle(canvas, (20, 20), (width-20, 80), (60, 60, 60), -1)
    cv2.putText(canvas, "AI Posture Detection & Form Checker", (50, 55), 
                cv2.FONT_HERSHEY_SIMPLEX, 1.2, (255, 255, 255), 2)
    
    # Main video area
    video_area = (50, 100, 800, 600)
    cv2.rectangle(canvas, (video_area[0], video_area[1]), 
                 (video_area[0] + video_area[2], video_area[1] + video_area[3]), 
                 (80, 80, 80), -1)
    
    # Draw stick figure (simulating pose detection)
    center_x, center_y = video_area[0] + video_area[2]//2, video_area[1] + video_area[3]//2
    
    # Body parts coordinates (relative to center)
    head = (center_x, center_y - 150)
    shoulders = [(center_x - 60, center_y - 100), (center_x + 60, center_y - 100)]
    elbows = [(center_x - 90, center_y - 50), (center_x + 90, center_y - 50)]
    wrists = [(center_x - 120, center_y), (center_x + 120, center_y)]
    hips = [(center_x - 30, center_y + 50), (center_x + 30, center_y + 50)]
    knees = [(center_x - 40, center_y + 150), (center_x + 40, center_y + 150)]
    ankles = [(center_x - 50, center_y + 250), (center_x + 50, center_y + 250)]
    
    # Draw skeleton
    skeleton_color = (255, 0, 255)  # Magenta
    joint_color = (255, 255, 0)    # Yellow
    
    # Draw connections
    connections = [
        (shoulders[0], shoulders[1]),  # Shoulders
        (shoulders[0], elbows[0]), (elbows[0], wrists[0]),  # Left arm
        (shoulders[1], elbows[1]), (elbows[1], wrists[1]),  # Right arm
        (shoulders[0], hips[0]), (shoulders[1], hips[1]),   # Torso
        (hips[0], hips[1]),  # Hips
        (hips[0], knees[0]), (knees[0], ankles[0]),  # Left leg
        (hips[1], knees[1]), (knees[1], ankles[1])   # Right leg
    ]
    
    for start, end in connections:
        cv2.line(canvas, start, end, skeleton_color, 3)
    
    # Draw joints
    joints = [head] + shoulders + elbows + wrists + hips + knees + ankles
    for joint in joints:
        cv2.circle(canvas, joint, 8, joint_color, -1)
        cv2.circle(canvas, joint, 10, (0, 0, 0), 2)
    
    # Draw angle annotations
    cv2.putText(canvas, "147.3°", (elbows[0][0] - 30, elbows[0][1] - 20), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
    cv2.putText(canvas, "152.1°", (elbows[1][0] - 30, elbows[1][1] - 20), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
    
    # Status indicator
    status_color = (0, 255, 0)  # Green for correct form
    cv2.rectangle(canvas, (video_area[0] + video_area[2] - 200, video_area[1] + 20), 
                 (video_area[0] + video_area[2] - 20, video_area[1] + 60), (0, 0, 0), -1)
    cv2.putText(canvas, "CORRECT FORM", (video_area[0] + video_area[2] - 190, video_area[1] + 45), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, status_color, 2)
    
    # Feedback area
    feedback_y = video_area[1] + video_area[3] - 80
    cv2.rectangle(canvas, (video_area[0], feedback_y), 
                 (video_area[0] + video_area[2], video_area[1] + video_area[3]), (0, 0, 0), -1)
    cv2.putText(canvas, "Good form! Keep your body straight", (video_area[0] + 20, feedback_y + 30), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
    cv2.putText(canvas, "Continue the movement", (video_area[0] + 20, feedback_y + 60), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
    
    # Side panel
    panel_x = 870
    cv2.rectangle(canvas, (panel_x, 100), (width - 20, 700), (60, 60, 60), -1)
    
    # Exercise selection
    cv2.putText(canvas, "Exercise Selection", (panel_x + 20, 140), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
    cv2.rectangle(canvas, (panel_x + 20, 160), (width - 40, 200), (100, 100, 100), -1)
    cv2.putText(canvas, "Push-ups", (panel_x + 30, 185), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
    
    # Statistics
    cv2.putText(canvas, "Statistics", (panel_x + 20, 250), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
    
    # Reps counter
    cv2.putText(canvas, "Reps: 12", (panel_x + 20, 290), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
    
    # Sets counter  
    cv2.putText(canvas, "Sets: 1", (panel_x + 20, 320), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
    
    # Angle measurements
    angles_y = 370
    cv2.putText(canvas, "Angle Measurements", (panel_x + 20, angles_y), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
    
    angle_data = [
        ("Left Elbow: 147.3°", (0, 255, 0)),
        ("Right Elbow: 152.1°", (0, 255, 0)),
        ("Body Alignment: 178.5°", (0, 255, 0))
    ]
    
    for i, (angle_text, color) in enumerate(angle_data):
        cv2.putText(canvas, angle_text, (panel_x + 20, angles_y + 30 + i * 30), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)
    
    # Controls
    controls_y = 520
    cv2.putText(canvas, "Controls", (panel_x + 20, controls_y), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
    
    # Buttons
    button_color = (100, 150, 100)
    cv2.rectangle(canvas, (panel_x + 20, controls_y + 20), (width - 40, controls_y + 60), button_color, -1)
    cv2.putText(canvas, "Start Camera", (panel_x + 30, controls_y + 45), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
    
    cv2.rectangle(canvas, (panel_x + 20, controls_y + 80), (width - 40, controls_y + 120), (150, 100, 100), -1)
    cv2.putText(canvas, "Stop Camera", (panel_x + 30, controls_y + 105), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
    
    cv2.rectangle(canvas, (panel_x + 20, controls_y + 140), (width - 40, controls_y + 180), (100, 100, 150), -1)
    cv2.putText(canvas, "Reset Counter", (panel_x + 30, controls_y + 165), 
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
    
    return canvas

def create_exercise_demos():
    """Create demo images for each exercise"""
    exercises = ["pushup", "squat", "bicep_curl", "plank"]
    
    for exercise in exercises:
        # Create canvas
        width, height = 800, 600
        canvas = np.zeros((height, width, 3), dtype=np.uint8)
        canvas[:] = (40, 40, 40)
        
        # Title
        exercise_name = exercise.replace('_', ' ').title()
        cv2.putText(canvas, f"{exercise_name} Detection", (50, 50), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1.0, (255, 255, 255), 2)
        
        # Save demo image
        cv2.imwrite(f"demo_{exercise}.png", canvas)
        print(f"Created demo_{exercise}.png")

if __name__ == "__main__":
    # Create main UI demo
    demo_ui = create_demo_ui()
    cv2.imwrite("demo_ui_layout.png", demo_ui)
    print("Created demo_ui_layout.png")
    
    # Create exercise demos
    create_exercise_demos()
    
    print("Demo images created successfully!")
    print("You can use these images to show the app's interface before running it.")