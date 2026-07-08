import smtplib
from email.mime.text import MIMEText

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

SENDER_EMAIL = "prattyancha009@gmail.com"
SENDER_PASSWORD = "xgzpmdeurjfeposi"

RECEIVER_EMAIL = "prattyancha26@gmail.com"


def send_email(subject: str, data_dict: dict):
    try:
        print("📧 Starting email send...")

        # ✅ Prepare email content
        body = f"""
Name: {data_dict.get("name")}
Email: {data_dict.get("email")}
Message: {data_dict.get("message")}
        """

        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = SENDER_EMAIL
        msg["To"] = RECEIVER_EMAIL

        # ✅ Connect to SMTP server
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=10)
        server.starttls()

        print("🔐 Logging in...")
        server.login(SENDER_EMAIL, SENDER_PASSWORD)

        print("📤 Sending email...")
        server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, msg.as_string())

        server.quit()

        print("✅ Email sent successfully")

    except Exception as e:
        print("❌ EMAIL ERROR:", str(e))