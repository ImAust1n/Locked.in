@echo off
echo 🧘 Surya Namaskar Detection App - Windows Setup
echo ===============================================

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8+ from python.org
    pause
    exit /b 1
)

echo ✅ Python found
python --version

echo.
echo 📦 Creating virtual environment...
python -m venv surya_env

echo.
echo 🔄 Activating virtual environment...
call surya_env\Scripts\activate.bat

echo.
echo ⬇️  Installing dependencies...
python -m pip install --upgrade pip
pip install opencv-python==4.8.1.78
pip install mediapipe==0.10.7
pip install numpy==1.24.3
pip install streamlit==1.28.1
pip install protobuf==3.20.3
pip install Pillow

echo.
echo ✅ Installation complete!
echo.
echo 🚀 To run the app:
echo 1. Streamlit Web App: streamlit run main.py
echo 2. Desktop App: python standalone_app.py
echo.
echo 📋 Make sure all Python files are in the same directory!
echo.
pause