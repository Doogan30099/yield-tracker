import { useState } from "react";


interface HarvestFormProps {
    onAdded: () => void
}



function HarvestForm(props: HarvestFormProps) {
  const [cycleNumber, setCycleNumber] = useState("");
  const [strain, setStrain] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [trimStartDate, setTrimStartDate] = useState("");
  const [gradeAGrams, setGradeAGrams] = useState("");
  const [extractionGrams, setExtractionGrams] = useState("");
  const [plantCount, setPlantCount] = useState("");
  const [avgPotencyPct, setAvgPotencyPct] = useState("");
  let gramsPerPlant: number | null = null;
  const gradeA = Number(gradeAGrams);
  const extractGrams = Number(extractionGrams);
  const plants = Number(plantCount);

  if (plants > 0) {
    gramsPerPlant = (gradeA + extractGrams) / plants;
  }



  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const newHarvest = {
      cycle_number: cycleNumber,
      strain: strain,
      harvest_date: harvestDate,
      trim_start_date: trimStartDate,
      grade_a_grams: gradeA,
      extraction_grams: extractGrams,
      plant_count: plants,
      avg_potency_pct: avgPotencyPct === "" ? null : Number(avgPotencyPct) ,
      grams_per_plant:  gramsPerPlant
    };
    console.log(newHarvest);  
 
    const response = await fetch(`${import.meta.env.VITE_API_URL}/harvests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHarvest),
    });
    if (!response.ok) {
      console.error("Failed to create harvest");
      return;
    }
    setCycleNumber("");
    setStrain("");
    setHarvestDate("");
    setTrimStartDate("");
    setGradeAGrams("");
    setExtractionGrams("");
    setPlantCount("");
    setAvgPotencyPct("");
    props.onAdded()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cycleNumber">Cycle Number</label>
        <input
          type="text"
          name="cycleNumber"
          id="cycleNumber"
          placeholder="Enter Cycle Number"
          value={cycleNumber}
          onChange={(e) => setCycleNumber(e.target.value)}
        />
        <label htmlFor="StrainName">Strain Name</label>
        <input
          type="text"
          name="StrainName"
          id="StrainName"
          placeholder="Enter Strain Name"
          value={strain}
          onChange={(e) => setStrain(e.target.value)}
        />
        <label htmlFor="harvestDate">Harvest Date</label>
        <input
          type="date"
          name="harvestDate"
          id="harvestDate"
          placeholder="Enter Harvest Date"
          value={harvestDate}
          onChange={(e) => setHarvestDate(e.target.value)}
        />
        <label htmlFor="trimStartDate">Trim start Date</label>
        <input
          type="date"
          name="trimStartDate"
          id="trimStartDate"
          placeholder="Enter Trim Start Date"
          value={trimStartDate}
          onChange={(e) => setTrimStartDate(e.target.value)}
        />
        <label htmlFor="gradeAGrams">Grade A Grams</label>
        <input
          type="number"
          name="gradeAGrams"
          id="gradeAGrams"
          placeholder="Enter Grade A Grams"
          value={gradeAGrams}
          onChange={(e) => setGradeAGrams(e.target.value)}
        />
        <label htmlFor="extractionGrams">Exctraction Grams</label>
        <input
          type="number"
          name="extractionGrams"
          id="extractionGrams"
          placeholder="Enter Extraction Grams"
          value={extractionGrams}
          onChange={(e) => setExtractionGrams(e.target.value)}
        />
        <label htmlFor="plantCount">Plant Count</label>
        <input
          type="number"
          name="plantCount"
          id="plantCount"
          placeholder="Enter Plant Count"
          value={plantCount}
          onChange={(e) => setPlantCount(e.target.value)}
        />
        <label htmlFor="avgPotencyPct">Average Potency Percentage</label>
        <input
          type="number"
          name="avgPotencyPct"
          id="avgPotencyPct"
          placeholder="Enter Potency Percentage"
          value={avgPotencyPct}
          onChange={(e) => setAvgPotencyPct(e.target.value)}
        />
        <p>
          Grams Per Plant:
          {gramsPerPlant !== null ? gramsPerPlant.toFixed(2) : "-"}
        </p>
        <button type="submit">Add Harvest</button>
      </form>
    </div>
  );
}


export default HarvestForm