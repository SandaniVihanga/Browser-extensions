


from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel
import joblib

API_KEY = "trailhead20260112"

app = FastAPI()

# Load trained model
model = joblib.load("malicious_url_model.pkl")

# Request body schema
class URLRequest(BaseModel):
    url: str

@app.post("/check-url")
def check_url(
    data: URLRequest,
    x_api_key: str = Header(None)
):
    # API key validation
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API Key")

    url = data.url
    prediction = model.predict([url])[0]

    return {
        "url": url,
        "malicious": bool(prediction),
        "label": "Malicious" if prediction == 1 else "Safe"
    }
