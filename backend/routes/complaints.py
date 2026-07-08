from fastapi import APIRouter, HTTPException, Depends
from database import get_db
from models import ContactCreate, HireCreate, ReviewCreate, ExperienceCreate
import json
from emailutility import send_email

router = APIRouter(prefix="/api")

# ---------------------- CONTACT ----------------------
@router.post("/add-contact")
def create_contact(data: ContactCreate, db=Depends(get_db)):
    try:
        cursor = db.cursor()

        cursor.execute(
            "INSERT INTO contacts (name, email, message) VALUES (%s, %s, %s)",
            (data.name, data.email, data.message),
        )
        db.commit()

        send_email("New Contact Request", data.dict())

        return {"message": "Contact submitted successfully"}

    except Exception as e:
        print("ERROR CONTACT:", str(e))  # 👈 IMPORTANT for debugging
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/contact")
def get_contacts(db=Depends(get_db)):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM contacts ORDER BY id DESC")
    return cursor.fetchall()


# ---------------------- HIRE ----------------------
@router.post("/add-hire")
def hire_me(data: HireCreate, db=Depends(get_db)):
    try:
        cursor = db.cursor()

        cursor.execute(
            "INSERT INTO hire_requests (name, email, project_details, budget) VALUES (%s, %s, %s, %s)",
            (data.name, data.email, data.project_details, data.budget),
        )
        db.commit()

        try:
            send_email(
                "New Hire Request",
                f"Name: {data.name}\nEmail: {data.email}\nProject: {data.project_details}\nBudget: {data.budget}",
            )
        except Exception as e:
            print("Email failed:", e)

        return {"message": "Hire request submitted successfully"}

    except Exception as e:
        print("ERROR HIRE:", str(e))
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/hire")
def get_hire_requests(db=Depends(get_db)):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM hire_requests ORDER BY id DESC")
    return cursor.fetchall()


# ---------------------- REVIEWS ----------------------
@router.post("/add-review")
def create_review(data: ReviewCreate, db=Depends(get_db)):
    try:
        cursor = db.cursor()

        cursor.execute(
            "INSERT INTO reviews (name, rating, comment) VALUES (%s, %s, %s)",
            (data.name, data.rating, data.comment),
        )
        db.commit()

        try:
            send_email(
                "New Review",
                f"Name: {data.name}\nRating: {data.rating}\nComment: {data.comment}",
            )
        except Exception as e:
            print("Email failed:", e)

        return {"message": "Review added successfully"}

    except Exception as e:
        print("ERROR REVIEW:", str(e))
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/review")
def get_reviews(db=Depends(get_db)):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM reviews ORDER BY id DESC")
    return cursor.fetchall()


@router.put("/review/{id}")
def update_review(id: int, data: ReviewCreate, db=Depends(get_db)):
    cursor = db.cursor()

    cursor.execute(
        "UPDATE reviews SET name=%s, rating=%s, comment=%s WHERE id=%s",
        (data.name, data.rating, data.comment, id),
    )
    db.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Review not found")

    return {"message": "Review updated successfully"}


# ---------------------- EXPERIENCE ----------------------
@router.post("/add-experience")
def add_experience(data: ExperienceCreate, db=Depends(get_db)):
    try:
        cursor = db.cursor()

        cursor.execute(
            """
            INSERT INTO experiences (company, role, duration, description, tech)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (
                data.company,
                data.role,
                data.duration,
                data.description,
                json.dumps(data.tech),
            ),
        )
        db.commit()

        return {"message": "Experience added successfully"}

    except Exception as e:
        print("ERROR EXPERIENCE:", str(e))
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/experience")
def get_experience(db=Depends(get_db)):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM experiences ORDER BY id DESC")
    data = cursor.fetchall()

    for d in data:
        if d.get("tech"):
            try:
                d["tech"] = json.loads(d["tech"])
            except:
                d["tech"] = []

    return data


@router.put("/experience/{id}")
def update_experience(id: int, data: ExperienceCreate, db=Depends(get_db)):
    cursor = db.cursor()

    cursor.execute(
        """
        UPDATE experiences
        SET company=%s, role=%s, duration=%s, description=%s, tech=%s
        WHERE id=%s
        """,
        (
            data.company,
            data.role,
            data.duration,
            data.description,
            json.dumps(data.tech),
            id,
        ),
    )
    db.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Experience not found")

    return {"message": "Experience updated successfully"}