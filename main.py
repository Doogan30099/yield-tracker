from fastapi import FastAPI
import csv
from pydantic import BaseModel

class Harvest(BaseModel):
    harvest_date: str
    trim_start_date: str
    cycle_number: int
    strain: str
    grade_a_grams: float
    extraction_grams: float
    plants: int| None = None
    avg_potency_pct: float| None = None
    grams_per_plant: float

app = FastAPI()

@app.get("/")
def find_yield():
    return {"message": "Yield found"}


@app.get("/harvests")
def get_all_yields():
    with open("harvests.csv", newline="") as csvfile:
        reader = csv.DictReader(csvfile)
        return {"yields": list(reader)}


@app.post("/harvests")
def create_harvest(harvest: Harvest):
    with open("harvests.csv", "a", newline="") as csvfile:
        fieldnames = [
            "harvest_date",
            "trim_start_date",
            "cycle_number",
            "strain",
            "grade_a_grams",
            "extraction_grams",
            "plants",
            "avg_potency_pct",
            "grams_per_plant"
        ]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writerow(harvest.model_dump())
    return {"message": "Harvest created",
            "harvest" : harvest }