
from fastapi import FastAPI
import csv
from pydantic import BaseModel, ConfigDict
from datetime import date
from sqlalchemy.orm import Session
from sqlalchemy import select
from database import engine, Harvest as HarvestModel
from fastapi.middleware.cors import CORSMiddleware






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
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


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


@app.post("/harvests", response_model=Harvest)
def create_harvest(harvest: Harvest):
    harvest_data = harvest.model_dump()
    with Session(engine) as session:
        harvest_model = HarvestModel(**harvest_data)
        session.add(harvest_model)
        session.commit()
        session.refresh(harvest_model)
    return harvest_model