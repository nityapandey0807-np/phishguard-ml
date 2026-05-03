# ===============================
# ML Model + Save Model
# ===============================

import pandas as pd
import re
import pickle

# Load cleaned data
df = pd.read_csv("cleaned_emails.csv")

print("\nLabel Distribution:\n", df['label'].value_counts())

X = df['cleaned_message']
y = df['label']

# Train-test split
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# TF-IDF
from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer(
    max_features=7000,
    ngram_range=(1,2),
    stop_words='english',
    min_df=2
)

X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# Model
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(max_iter=1000, class_weight='balanced')
model.fit(X_train_tfidf, y_train)

# Accuracy
from sklearn.metrics import accuracy_score

y_pred = model.predict(X_test_tfidf)
accuracy = accuracy_score(y_test, y_pred)

print("\n🎯 Accuracy:", round(accuracy*100,2), "%")

# Clean input
def clean_input(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z]', ' ', text)
    return text

# Predict
def predict_email(text):
    text = clean_input(text)
    vec = vectorizer.transform([text])
    res = model.predict(vec)[0]
    return "Spam ❌" if res==1 else "Not Spam ✅"

print("\nSample Predictions:")
print(predict_email("WIN MONEY NOW CLICK HERE"))
print(predict_email("Let's meet tomorrow"))

# Save model
with open("model.pkl","wb") as f:
    pickle.dump(model,f)

with open("vectorizer.pkl","wb") as f:
    pickle.dump(vectorizer,f)

print("\n💾 Model saved!")