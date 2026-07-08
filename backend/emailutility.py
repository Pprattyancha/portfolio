import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ⚠️ Replace with your credentials
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SENDER_EMAIL = "prattyancha009@gmail.com"
SENDER_PASSWORD = "xgzpmdeurjfeposi"   # Use App Password (not normal password)
RECEIVER_EMAIL = "prattyancha26@gmail.com" # Where you want to receive emails


def format_email_body(data_dict: dict) -> str:
    return "\n".join([f"{key.capitalize()}: {value}" for key, value in data_dict.items()])


def send_email(subject: str, data_dict: dict):
    try:
        sender_email = "your_email@gmail.com"
        receiver_email = data_dict.get("email")

        message = f"""
        Subject: {subject}

        Name: {data_dict.get("name")}
        Email: {receiver_email}
        Message: {data_dict.get("message")}
        """

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, "your_app_password")

        server.sendmail(sender_email, sender_email, message)  # send to yourself
        server.quit()

        # ✅ Success Response
        return {
            "statusCode": status.HTTP_200_OK,
            "message": "Email sent successfully"
        }

    except smtplib.SMTPAuthenticationError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email authentication failed. Check credentials."
        )

    except smtplib.SMTPException as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"SMTP error occurred: {str(e)}"
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Something went wrong: {str(e)}"
        )