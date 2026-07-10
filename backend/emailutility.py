import requests
import os

RESEND_API_KEY = os.getenv("RESEND_API_KEY")  # ✅ secure

def send_email(subject: str, data_dict: dict):
    try:
        print("📧 Sending via Resend...")

        if not RESEND_API_KEY:
            print("❌ ERROR: RESEND_API_KEY is missing")
            return

        html_content = f"""
        <h3>New Contact Request</h3>
        <p><b>Name:</b> {data_dict.get("name")}</p>
        <p><b>Email:</b> {data_dict.get("email")}</p>
        <p><b>Message:</b> {data_dict.get("message")}</p>
        """

        response = requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "from": "Prattyancha <noreply@pcontact.com>",  # ✅ REQUIRED for sandbox
                "to": ["prattyancha009@gmail.com"],  # ✅ MUST match your Resend account
                "subject": subject,
                "html": html_content,
            },
        )

        print("📨 Status Code:", response.status_code)
        print("📨 Response:", response.text)

    except Exception as e:
        print("❌ EMAIL ERROR:", str(e))