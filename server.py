from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import smtplib
import base64
from email.message import EmailMessage

app = FastAPI()

origins = [
    "http://localhost:52330"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SMTP_HOST = 'smtp.email.com'
SMTP_PORT = 587
SMTP_USER = 'user'
SMTP_PASS = 'password'

class ChartRequest(BaseModel):
    email: EmailStr
    image: str

@app.post("/send-chart")
async def send_chart(req: ChartRequest):
    try:
        # Extract base64 image data
        if ',' in req.image:
            image_data = req.image.split(',')[1]
        else:
            image_data = req.image
        img_bytes = base64.b64decode(image_data)

        # Prepare email
        msg = EmailMessage()
        msg['Subject'] = 'Your Chart Image'
        msg['From'] = 'user@email.com'
        msg['To'] = req.email
        msg.set_content('Attached is your chart image.')
        msg.add_attachment(img_bytes, maintype='image', subtype='png', filename='chart.png')

        # Send email
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)

        return {"message": "Email sent!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error sending email")
    


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="localhost", port=3000, reload=True)
