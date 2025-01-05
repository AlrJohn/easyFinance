#!/bin/bash

#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting project setup...${NC}"

# Function to check if a dependency is installed, and install it if not
install_dependency() {
  if ! command -v $1 &> /dev/null; then
    echo -e "${GREEN}Installing $1...${NC}"
    sudo apt update && sudo apt install -y $2
  else
    echo -e "${GREEN}$1 is already installed.${NC}"
  fi
}

# Check and install dependencies
install_dependency "python3" "python3"
install_dependency "pip3" "python3-pip"
install_dependency "node" "nodejs"
install_dependency "npm" "npm"

# Ensure pip is up-to-date
echo -e "${GREEN}Upgrading pip...${NC}"
pip3 install --upgrade pip

# Navigate to backend and install Python dependencies
echo -e "${GREEN}Setting up backend...${NC}"
cd backend || { echo -e "${RED}Backend directory not found!${NC}"; exit 1; }
pip3 install -r requirements.txt || { echo -e "${RED}Python dependencies installation failed.${NC}"; exit 1; }

# Initialize SQLite database (if needed)
echo -e "${GREEN}Initializing SQLite database...${NC}"
flask db upgrade || { echo -e "${RED}Database initialization failed. Check migrations.${NC}"; exit 1; }
cd ..

# Navigate to frontend and install Node.js dependencies
echo -e "${GREEN}Setting up frontend...${NC}"
cd frontend || { echo -e "${RED}Frontend directory not found!${NC}"; exit 1; }
echo -e "${GREEN}Installing frontend dependencies...${NC}"

if ! npm install; then
  echo -e "${RED}npm install failed! Retrying with --force...${NC}"
  if ! npm install --force; then
    echo -e "${RED}npm install --force also failed! Exiting.${NC}"
    echo -e "${RED}Suggestions:${NC}"
    echo -e "${GREEN}1. Check your Node.js version and update if necessary.${NC}"
    echo -e "${GREEN}2. Ensure you have sufficient permissions to run npm commands.${NC}"
    exit 1
  else
    echo -e "${GREEN}npm install --force succeeded.${NC}"
  fi
else
  echo -e "${GREEN}npm install succeeded.${NC}"
fi
cd ..

# Final message
echo -e "${GREEN}Setup completed!${NC}"
echo -e "${GREEN}To start the backend server:${NC} cd backend && flask run"
echo -e "${GREEN}To start the frontend server:${NC} cd frontend && npm run dev"
