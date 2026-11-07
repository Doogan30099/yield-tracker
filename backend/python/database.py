from sqlalchemy import create_engine, text 
import os
from dotenv import load_dotenv
from typing import Optional
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase,Mapped,mapped_column
from datetime import date



class Base(DeclarativeBase):
    pass

class Harvest(Base):
    __tablename__ = "harvests"
    id:Mapped[int] = mapped_column(primary_key=True)
    harvest_date: Mapped[date] = mapped_column()
    trim_start_date: Mapped[date] = mapped_column()
    cycle_number: Mapped[str] = mapped_column(String(50))
    strain: Mapped[str] = mapped_column(String(50))
    grade_a_grams: Mapped[Optional[float]] = mapped_column()
    extraction_grams: Mapped[Optional[float]] = mapped_column()
    plants: Mapped[Optional[int]] = mapped_column()
    avg_potency_pct: Mapped[Optional[float]] = mapped_column()
    grams_per_plant: Mapped[Optional[float]] = mapped_column()




load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    result = conn.execute(text("SELECT * FROM harvests"))
    for row in result:
        print(row)