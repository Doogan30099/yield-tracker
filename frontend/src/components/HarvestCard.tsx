import { useState } from 'react'
import type {Harvest} from "../types"
// In HarvestCard:
// 1. import type Harvest from types
// 2. change the props interface to one field: harvest: Harvest
// 3. take { harvest } in the function and read harvest.strain, harvest.grade_a_grams, etc.
// 4. delete the old HarvestCardProps fields



interface HarvestCardProps {
    harvest : Harvest 

}



function HarvestCard({harvest}: HarvestCardProps) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>Harvest Card</h2>
      <p>Strain Name: {harvest.strain}</p>
      <p>Yield: {harvest.grade_a_grams ?? 'N/A'}g</p>
      <p>Potency percentage: {harvest.avg_potency_pct ?? 'N/A'}%</p>
      <p>Harvest Date: {harvest.harvest_date}</p>
      <p>Trim Start Date: {harvest.trim_start_date}</p>
      <p>Cycle Number: {harvest.cycle_number}</p>
      <p>Extraction Grams: {harvest.extraction_grams ?? 'N/A'}g</p>
      <p>Plant Count: {harvest.plant_count ?? 'N/A'}</p>
      <p>Grams per Plant: {harvest.grams_per_plant.toFixed(2) ?? 'N/A'}g</p>
      <button onClick={() => setCount(previousCount => previousCount + 1)}>Like {count}</button>
    </div>
  );
}

export type { HarvestCardProps };
export default HarvestCard;
