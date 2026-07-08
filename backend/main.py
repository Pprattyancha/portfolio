from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import complaints
# from routes import api

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(complaints.router)
# app.include_router(api.router)
@app.get("/")
def home():
    return {"message": "Complaint Analytics API Running"}