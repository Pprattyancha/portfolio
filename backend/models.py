from pydantic import BaseModel
from typing import List, Optional

# Contact Me
class ContactCreate(BaseModel):
    name: str
    email: str
    message: str

# Hire Me
class HireCreate(BaseModel):
    name: str
    email: str
    project_details: str
    budget: Optional[str]

# Review
class ReviewCreate(BaseModel):
    name: str
    rating: int
    comment: str

# Experience
class ExperienceCreate(BaseModel):
    company: str
    role: str
    duration: str
    description: str
    tech: List[str]