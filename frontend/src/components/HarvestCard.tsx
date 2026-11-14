import { useState } from 'react'



interface HarvestCardProps {
    harvest_date: string;
    trim_start_date: string;
    cycle_number: string;
    strain: string;
    grade_a_grams: number | null;
    extraction_grams: number | null;
    plant_count : number | null;
    avg_potency_pct: number | null;
    grams_per_plant: number | null;


}



function HarvestCard(props: HarvestCardProps) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>Harvest Card</h2>
      <p>Strain Name: {props.strain}</p>
      <p>Yield: {props.grade_a_grams ?? 'N/A'}g</p>
      <p>Potency percentage: {props.avg_potency_pct ?? 'N/A'}%</p>
      <p>Harvest Date: {props.harvest_date}</p>
      <p>Trim Start Date: {props.trim_start_date}</p>
      <p>Cycle Number: {props.cycle_number}</p>
      <p>Extraction Grams: {props.extraction_grams ?? 'N/A'}g</p>
      <p>Plant Count: {props.plant_count ?? 'N/A'}</p>
      <p>Grams per Plant: {props.grams_per_plant ?? 'N/A'}g</p>
      <button onClick={() => setCount(previousCount => previousCount + 1)}>Like {count}</button>
    </div>
  );
}

export type { HarvestCardProps };
export default HarvestCard;
