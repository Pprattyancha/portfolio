import smtplib
from email.mime.text import MIMEText
import os

EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("EMAIL_APP_PASSWORD")

def send_email(subject, data):
    try:
        msg = MIMEText(str(data), "html")
        msg["Subject"] = subject
        msg["From"] = EMAIL
        msg["To"] = "prattyancha009@gmail.com"

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL, PASSWORD)
            server.send_message(msg)

        print("✅ Email sent successfully")

    except Exception as e:
        print("❌ Email error:", str(e))