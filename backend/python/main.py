
from fastapi import FastAPI
from pydantic import BaseModel, ConfigDict
from datetime import date
from sqlalchemy.orm import Session
from sqlalchemy import select,func
from database import engine, Harvest as HarvestModel
from fastapi.middleware.cors import CORSMiddleware






class Harvest(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int | None 
    harvest_date: date | None 
    trim_start_date: date | None 
    cycle_number: str | None 
    strain: str | None 
    grade_a_grams: float | None
    extraction_grams: float | None 
    plant_count: int | None 
    avg_potency_pct: float | None
    grams_per_plant: float | None 


class HarvestCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    harvest_date: date 
    trim_start_date: date 
    cycle_number: str 
    strain: str 
    grade_a_grams: float 
    extraction_grams: float 
    plant_count: int 
    avg_potency_pct: float | None = None


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://yield-tracker-1.onrender.com"],
    allow_methods=["GET","POST"],
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

# GET /stats
# 1. Open a Session (same as GET /harvests)
# 2. Query 1: totals for grade A, extraction, plants, and avg grams per plant
#    (only rows where plant_count is not null)
# 3. Query 2: top strain by total grams (group by strain, order desc, limit 1)
# 4. Return JSON like:
#    { total_grade_a: ___, total_extraction: ___, total_plants: ___,
#      avg_grams_per_plant: ___, top_strain: ___ }
@app.get("/stats")
def get_harvest_stats():
    with Session(engine) as session:
        stmt = select(
            func.sum(HarvestModel.grade_a_grams),
            func.sum(HarvestModel.extraction_grams),
            func.sum(HarvestModel.plant_count),
            (func.sum(HarvestModel.grade_a_grams) + func.sum(HarvestModel.extraction_grams)) / func.sum(HarvestModel.plant_count)
        ).where(HarvestModel.plant_count != None)
        result = session.execute(stmt)
        totals = result.one_or_none()

        total_grade_a = totals[0] if totals else 0
        total_extraction = totals[1] if totals else 0
        total_plants = totals[2] if totals else 0
        avg_grams_per_plant = totals[3] if totals else 0

        stmt = select(
            HarvestModel.strain,
            func.sum(HarvestModel.grade_a_grams + HarvestModel.extraction_grams)
        ).group_by(HarvestModel.strain).order_by(func.sum(HarvestModel.grade_a_grams + HarvestModel.extraction_grams).desc()).limit(1)
        result = session.execute(stmt)
        top_strain_row = result.first()
        top_strain = top_strain_row[0] if top_strain_row else None

        return {
            "total_grade_a": total_grade_a,
            "total_extraction": total_extraction,
            "total_plants": total_plants,
            "avg_grams_per_plant": avg_grams_per_plant,
            "top_strain": top_strain
        }





# 1. make HarvestCreate: every field except id and grams_per_plant
# 2. put grams_per_plant back into Harvest (grams_per_plant: float | None)
# 3. change the route parameter to harvest: HarvestCreate

@app.post("/harvests", response_model=Harvest)
def create_harvest(harvest: HarvestCreate):
    harvest_data = harvest.model_dump()
    if harvest_data["plant_count"] > 0:
        harvest_data["grams_per_plant"] = (harvest_data["grade_a_grams"] + harvest_data["extraction_grams"]) / harvest_data["plant_count"]
    else:
        harvest_data["grams_per_plant"] = None
    with Session(engine) as session:
        harvest_model = HarvestModel(**harvest_data)
        session.add(harvest_model)
        session.commit()
        session.refresh(harvest_model)
    return harvest_model