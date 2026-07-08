import requests

RESEND_API_KEY = "re_KqCRAFvM_Cif8isBTvhn7GkLdMEjivdEc"

def send_email(subject: str, data_dict: dict):
    try:
        print("📧 Sending via Resend...")

        response = requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "from": "onboarding@resend.dev",
                "to": ["prattyancha26@gmail.com"],
                "subject": subject,
                "html": f"""
                <h3>New Contact Request</h3>
                <p><b>Name:</b> {data_dict.get("name")}</p>
                <p><b>Email:</b> {data_dict.get("email")}</p>
                <p><b>Message:</b> {data_dict.get("message")}</p>
                """,
            },
        )

        print("📨 Response:", response.text)

    except Exception as e:
        print("❌ EMAIL ERROR:", str(e))