"""
Setup script to create the project structure and install dependencies
"""
import os
import subprocess
import sys

def create_project_structure():
    """Create the necessary project directories and files"""
    
    # Create utils directory
    if not os.path.exists('utils'):
        os.makedirs('utils')
        print("✓ Created utils directory")
    
    # Create __init__.py in utils
    init_file_path = os.path.join('utils', '__init__.py')
    if not os.path.exists(init_file_path):
        with open(init_file_path, 'w') as f:
            f.write('# Empty __init__.py file to make utils a Python package\n')
        print("✓ Created utils/__init__.py")
    
    print("✓ Project structure created successfully")

def install_dependencies():
    """Install required Python packages"""
    try:
        print("Installing dependencies...")
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
        print("✓ Dependencies installed successfully")
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies. Please run manually:")
        print("pip install -r requirements.txt")
        return False
    return True

def main():
    """Main setup function"""
    print("🏋️ Setting up AI Posture Detection App...\n")
    
    # Create project structure
    create_project_structure()
    
    # Install dependencies
    if install_dependencies():
        print("\n🎉 Setup completed successfully!")
        print("\nTo run the application:")
        print("streamlit run main.py")
    else:
        print("\n⚠️  Setup completed with warnings. Please install dependencies manually.")

if __name__ == "__main__":
    main()