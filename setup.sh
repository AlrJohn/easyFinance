#!/bin/bash

echo "Setting up Backend..."
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

echo "Setting up Frontend..."
cd frontend
npm install
cd ..

echo "Setup Complete!"
