import requests
import os
from dotenv import load_dotenv

# ✅ Load .env file
load_dotenv()
API_KEY = os.getenv("RESEND_API_KEY")

def send_email(subject, data_dict):
    url = "https://api.brevo.com/v3/smtp/email"

    headers = {
        "accept": "application/json",
        "api-key": API_KEY,
        "content-type": "application/json"
    }

    data = {
        "sender": {
            "name": "Prattyancha",
            "email": "no-reply@brevo.com"  # ✅ works without domain setup
        },
        "to": [
            {"email": "prattyancha009@gmail.com"}
        ],
        "subject": subject,
        "htmlContent": f"""
        <h3>New Contact Request</h3>
        <p><b>Name:</b> {data_dict.get("name")}</p>
        <p><b>Email:</b> {data_dict.get("email")}</p>
        <p><b>Message:</b> {data_dict.get("message")}</p>
        """
    }

    response = requests.post(url, headers=headers, json=data)

    print("Status:", response.status_code)
    print("Response:", response.text)