import pandas as pd
from database import get_db

db = get_db()
df = pd.read_sql("SELECT * FROM complaints", db)

# KPI: Complaint count by category
category_count = df.groupby("category").size()

# KPI: Avg resolution time
df["resolved_at"] = pd.to_datetime(df["resolved_at"])
df["created_at"] = pd.to_datetime(df["created_at"])

df["resolution_time"] = (df["resolved_at"] - df["created_at"]).dt.days
avg_resolution = df["resolution_time"].mean()

print(category_count)
print(avg_resolution)