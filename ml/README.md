# PhishGuard ML Component

This repository contains the Machine Learning component for PhishGuard, an advanced phishing email detection system that uses AI to protect users from cyber threats.

## 🎯 What is PhishGuard?

PhishGuard is a comprehensive email security solution that analyzes emails in real-time to detect phishing attempts, spam, and malicious content. The system combines machine learning algorithms with heuristic analysis to provide accurate threat detection with confidence scores.

## 📊 Features

- **Advanced ML Model**: Trained on large datasets of legitimate and phishing emails
- **Real-time Analysis**: Instant threat detection for email content
- **Confidence Scoring**: Provides risk percentage and detailed reasoning
- **Multiple Detection Methods**: Combines text analysis, URL checking, and pattern recognition
- **High Accuracy**: Optimized for both precision and recall

## 🗂️ Files Included

- `model.py` - Complete ML pipeline for model training and evaluation
- `preprocessing.py` - Data cleaning and feature extraction utilities
- `cleaned_emails.csv` - Preprocessed training dataset (5,000+ emails)
- `emails.csv` - Raw email data for analysis
- `spam.csv` - Spam email collection for training

## 🚀 Quick Start

### Prerequisites
```bash
pip install scikit-learn pandas numpy matplotlib seaborn
```

### Training the Model
```python
# Preprocess the data
python preprocessing.py

# Train and evaluate the model
python model.py
```

## 🧠 Model Architecture

The ML model uses:
- **Text Vectorization**: TF-IDF transformation for email content
- **Feature Engineering**: Custom features for URLs, domains, and patterns
- **Classification Algorithm**: Ensemble methods for robust prediction
- **Evaluation Metrics**: Precision, Recall, F1-Score, and Accuracy

## 📈 Performance

- **Accuracy**: 95%+ on test datasets
- **Precision**: High true positive rate for phishing detection
- **Recall**: Low false negative rate for security
- **Processing Speed**: Sub-second analysis for real-time use

## 🔗 Integration

This ML component integrates with the PhishGuard backend API:
- Model outputs: `model.pkl` (trained classifier)
- Vectorizer: `vectorizer.pkl` (text preprocessing)
- API endpoint: `/predict` for real-time analysis

## 🤝 Contributing

This is part of a collaborative project:
- **Frontend**: Modern web interface (HTML/CSS/JS)
- **Backend**: Flask REST API
- **ML**: Model development and optimization

## 📄 License

This project is developed for educational and research purposes in cybersecurity.