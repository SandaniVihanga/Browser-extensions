
import pandas as pd
import re
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score
import joblib

# 1. Load CSV
data = pd.read_csv("malicious_urls.csv")  # <CSV name

# 2. Basic cleaning
data = data.dropna()
data["url"] = data["url"].astype(str)

X = data["url"]
y = data["label"]

# 3. Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 4. Create ML pipeline
model = Pipeline([
    ("tfidf", TfidfVectorizer(
        analyzer="char",
        ngram_range=(3, 5)
    )),
    ("clf", LogisticRegression(max_iter=1000))
])

# 5. Train model
model.fit(X_train, y_train)

# 6. Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print("Model Accuracy:", accuracy)

# 7. Save model as .pkl
joblib.dump(model, "malicious_url_model.pkl")

print("Model saved as malicious_url_model.pkl")
