# ===============================
# Data Preprocessing
# ===============================

import pandas as pd
import nltk
import re
from nltk.corpus import stopwords

nltk.download('stopwords')

# Load dataset
df = pd.read_csv("emails.csv", encoding='latin-1')

print("\nColumns:", df.columns)

# Handle your dataset format (text + spam)
df = df[['spam', 'text']]
df.columns = ['label', 'message']

# If label is already numeric, skip mapping
if df['label'].dtype == 'object':
    df['label'] = df['label'].map({'ham': 0, 'spam': 1})

# Clean text
stop_words = set(stopwords.words('english'))

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'[^a-zA-Z]', ' ', text)
    words = text.split()
    words = [w for w in words if w not in stop_words]
    return " ".join(words)

df['cleaned_message'] = df['message'].apply(clean_text)

# Save cleaned data
df.to_csv("cleaned_emails.csv", index=False)

print("\n✅ Preprocessing Done!")