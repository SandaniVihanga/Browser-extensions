# Malicious URL Checker

A Chrome Extension that checks whether visited websites are malicious or safe using machine learning classification.

## Features

- 🛡️ Real-time malicious URL detection
- 🤖 ML-powered classification using Logistic Regression
- ⚡ Fast API responses with FastAPI backend
- 🔐 API key authentication
- 📊 TF-IDF text feature extraction

## Project Structure

```
├── api-back-end/
│   ├── api.py              # FastAPI server endpoints
│   ├── train_model.py      # ML model training pipeline
│   └── malicious_urls.csv  # Training dataset
└── api-front-end/
    ├── manifest.json       # Chrome extension config
    ├── popup.html          # Extension popup UI
    ├── popup.js            # Popup logic and API calls
    └── style.css           # Styling
```

## Requirements

### Backend
- Python 3.8+
- FastAPI
- Pydantic
- scikit-learn
- pandas
- joblib

### Frontend
- Chrome/Chromium browser

## Setup

### 1. Install Backend Dependencies

```bash
cd api-back-end
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Train ML Model

```bash
python train_model.py
```

This generates `malicious_url_model.pkl` from the training data.

### 3. Run API Server

```bash
python -m uvicorn api:app --reload --host 127.0.0.1 --port 8000
```

### 4. Install Chrome Extension

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `api-front-end/` folder

## API Endpoint

**POST** `/check-url`

Request:
```json
{
  "url": "https://example.com"
}
```

Response:
```json
{
  "url": "https://example.com",
  "malicious": false,
  "label": "Safe"
}
```

**Header Required:**
- `X-API-Key: trailhead20260112`

## Usage

1. Visit any website
2. Click the extension icon
3. The popup will display whether the URL is malicious or safe

## Model Performance

- Algorithm: Logistic Regression
- Vectorizer: TF-IDF (3-5 char n-grams)
- Train/Test Split: 80/20

## Security Notes

- Update API key in production
- Use HTTPS for API in production
- Validate/sanitize URLs before submission

## License

MIT License - See LICENSE file for details
