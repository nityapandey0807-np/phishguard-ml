# PhishGuard ML Component

This repository contains the Machine Learning component for PhishGuard, a phishing email detection system.

## Files

- `model.py` - ML model training and evaluation code
- `preprocessing.py` - Data preprocessing utilities
- `cleaned_emails.csv` - Preprocessed email dataset
- `emails.csv` - Raw email data
- `spam.csv` - Spam email dataset

## Setup

1. Install dependencies:
```bash
pip install scikit-learn pandas numpy
```

2. Run preprocessing:
```python
python preprocessing.py
```

3. Train the model:
```python
python model.py
```

## Model Details

The model uses a machine learning approach to detect phishing emails based on various features including:
- Text content analysis
- URL patterns
- Email headers
- Sender information

## Output

The trained model (`model.pkl`) and vectorizer (`vectorizer.pkl`) are used by the backend Flask application for real-time phishing detection.