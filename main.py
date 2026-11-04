
from fastapi import FastAPI
import csv
from pydantic import BaseModel, ConfigDict
from datetime import date
from sqlalchemy.orm import Session
from database import engine, Harvest as HarvestModel
from sqlalchemy import select



class Harvest(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    harvest_date: date | None = None
    trim_start_date: date | None = None
    cycle_number: str | None = None
    strain: str | None = None
    grade_a_grams: float | None = None
    extraction_grams: float | None = None
    plants: int | None = None
    avg_potency_pct: float | None = None
    grams_per_plant: float | None = None


app = FastAPI()


@app.get("/")
def find_yield():
    return {"message": "Yield found"}


@app.get("/harvests", response_model=list[Harvest])
def get_all_yields():
    with Session(engine) as session:
        stmt = select(HarvestModel)
        result = session.execute(stmt)
        harvests = result.scalars().all()
        return harvests
    # with open("harvests.csv", newline="") as csvfile:
    #     reader = csv.DictReader(csvfile)
    #     return {"yields": list(reader)}


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