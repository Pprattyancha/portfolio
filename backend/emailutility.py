import requests
import os

# ✅ Get API key from environment variable (IMPORTANT)
RESEND_API_KEY = "re_7M7vcYKc_8wp7CzrsE78DyG9X1iiWRAGb"


def send_email(subject: str, data_dict: dict):
    try:
        print("📧 Sending via Resend...")

        # ✅ Check if API key exists
        if not RESEND_API_KEY:
            print("❌ ERROR: RESEND_API_KEY is missing")
            return

        # ✅ Prepare email content
        html_content = f"""
        <h3>New Contact Request</h3>
        <p><b>Name:</b> {data_dict.get("name")}</p>
        <p><b>Email:</b> {data_dict.get("email")}</p>
        <p><b>Message:</b> {data_dict.get("message")}</p>
        """

        # ✅ Send request to Resend API
        response = requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "from": "onboarding@resend.dev",  # sandbox sender
                "to": ["prattyancha26@gmail.com"],  # your receiving email
                "subject": subject,
                "html": html_content,
            },
        )

        # ✅ Debug response
        print("📨 Status Code:", response.status_code)
        print("📨 Response:", response.text)

        # ✅ Success check
        if response.status_code in [200, 201]:
            print("✅ Email sent successfully")
        else:
            print("❌ Failed to send email")

    except Exception as e:
        print("❌ EMAIL ERROR:", str(e))