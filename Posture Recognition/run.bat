# Windows Batch File (run.bat)
@echo off
echo Starting AI Posture Detection App...
echo.
echo Make sure your webcam is connected and working!
echo.
streamlit run main.py
pause

# macOS/Linux Shell Script (run.sh)
#!/bin/bash
echo "Starting AI Posture Detection App..."
echo ""
echo "Make sure your webcam is connected and working!"
echo ""
streamlit run main.py