from fastapi import APIRouter, Depends, BackgroundTasks
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
        cursor.close()
        db.close()

        # 🔥 DIRECT CALL (for debugging)
        send_email("New Contact Request", data.dict())

        return {"message": "Contact submitted successfully"}

    except Exception as e:
        print("❌ ERROR:", str(e))
        return {"error": str(e)}

@router.get("/contact")
def get_contacts(db=Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM contacts ORDER BY id DESC")
        data = cursor.fetchall()

        cursor.close()
        db.close()

        return data

    except Exception as e:
        print("❌ ERROR GET CONTACT:", str(e))
        return {"error": str(e)}


# ---------------------- HIRE ----------------------
@router.post("/add-hire")
def hire_me(
    data: HireCreate,
    background_tasks: BackgroundTasks,
    db=Depends(get_db)
):
    try:
        cursor = db.cursor()

        cursor.execute(
            "INSERT INTO hire_requests (name, email, project_details, budget) VALUES (%s, %s, %s, %s)",
            (data.name, data.email, data.project_details, data.budget),
        )

        db.commit()
        cursor.close()
        db.close()

        # ✅ Background email
        background_tasks.add_task(
            send_email,
            "New Hire Request",
            f"Name: {data.name}\nEmail: {data.email}\nProject: {data.project_details}\nBudget: {data.budget}"
        )

        return {"message": "Hire request submitted successfully"}

    except Exception as e:
        print("❌ ERROR HIRE:", str(e))
        return {"error": str(e)}


@router.get("/hire")
def get_hire_requests(db=Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM hire_requests ORDER BY id DESC")
        data = cursor.fetchall()

        cursor.close()
        db.close()

        return data

    except Exception as e:
        print("❌ ERROR GET HIRE:", str(e))
        return {"error": str(e)}


# ---------------------- REVIEWS ----------------------
@router.post("/add-review")
def create_review(
    data: ReviewCreate,
    background_tasks: BackgroundTasks,
    db=Depends(get_db)
):
    try:
        cursor = db.cursor()

        cursor.execute(
            "INSERT INTO reviews (name, rating, comment) VALUES (%s, %s, %s)",
            (data.name, data.rating, data.comment),
        )

        db.commit()
        cursor.close()
        db.close()

        # ✅ Background email
        background_tasks.add_task(
            send_email,
            "New Review",
            f"Name: {data.name}\nRating: {data.rating}\nComment: {data.comment}"
        )

        return {"message": "Review added successfully"}

    except Exception as e:
        print("❌ ERROR REVIEW:", str(e))
        return {"error": str(e)}


@router.get("/review")
def get_reviews(db=Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM reviews ORDER BY id DESC")
        data = cursor.fetchall()

        cursor.close()
        db.close()

        return data

    except Exception as e:
        print("❌ ERROR GET REVIEW:", str(e))
        return {"error": str(e)}


@router.put("/review/{id}")
def update_review(id: int, data: ReviewCreate, db=Depends(get_db)):
    try:
        cursor = db.cursor()

        cursor.execute(
            "UPDATE reviews SET name=%s, rating=%s, comment=%s WHERE id=%s",
            (data.name, data.rating, data.comment, id),
        )

        db.commit()

        if cursor.rowcount == 0:
            return {"error": "Review not found"}

        cursor.close()
        db.close()

        return {"message": "Review updated successfully"}

    except Exception as e:
        print("❌ ERROR UPDATE REVIEW:", str(e))
        return {"error": str(e)}


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
        cursor.close()
        db.close()

        return {"message": "Experience added successfully"}

    except Exception as e:
        print("❌ ERROR EXPERIENCE:", str(e))
        return {"error": str(e)}


@router.get("/experience")
def get_experience(db=Depends(get_db)):
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM experiences ORDER BY id DESC")
        data = cursor.fetchall()

        cursor.close()
        db.close()

        for d in data:
            if d.get("tech"):
                try:
                    d["tech"] = json.loads(d["tech"])
                except:
                    d["tech"] = []

        return data

    except Exception as e:
        print("❌ ERROR GET EXPERIENCE:", str(e))
        return {"error": str(e)}


@router.put("/experience/{id}")
def update_experience(id: int, data: ExperienceCreate, db=Depends(get_db)):
    try:
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
            return {"error": "Experience not found"}

        cursor.close()
        db.close()

        return {"message": "Experience updated successfully"}

    except Exception as e:
        print("❌ ERROR UPDATE EXPERIENCE:", str(e))
        return {"error": str(e)}