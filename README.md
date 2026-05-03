# PhishGuard - Phishing Email Detection System

A comprehensive phishing email detection system with ML-powered analysis.

## Project Structure

This project is organized into three main components:

### Frontend (UI)
- **Location**: `frontend/` folder
- **Technologies**: HTML, CSS, JavaScript
- **Files**: 
  - `templates/index.html` - Main UI
  - `static/stylemini.css` - Styling
  - `static/miniscript.js` - Frontend logic

### Backend (API)
- **Location**: `backend/` folder  
- **Technologies**: Python Flask
- **Files**:
  - `app.py` - Flask application
  - `model.pkl` - Trained ML model
  - `vectorizer.pkl` - Text vectorizer

### Machine Learning (ML)
- **Location**: `ml/` folder
- **Technologies**: Python, scikit-learn
- **Files**:
  - `model.py` - Model training code
  - `preprocessing.py` - Data preprocessing
  - `*.csv` - Training datasets

## Team Distribution

- **Person 1**: Frontend development (UI/UX)
- **Person 2**: Backend development (Flask API)
- **Person 3**: Machine Learning (Model training & optimization)

## Setup Instructions

### Frontend Setup
```bash
cd frontend
# Serve static files (HTML, CSS, JS)
```

### Backend Setup
```bash
cd backend
pip install flask scikit-learn
python app.py
```

### ML Setup
```bash
cd ml
pip install scikit-learn pandas numpy
python preprocessing.py
python model.py
```

## Features

- Real-time email phishing detection
- ML-powered analysis with confidence scores
- Modern, responsive UI
- RESTful API endpoints
- Comprehensive security checks

## API Endpoints

- `GET /` - Main UI
- `POST /predict` - Email analysis

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Python Flask
- **ML**: scikit-learn, pandas, numpy
- **Styling**: Custom CSS with modern design