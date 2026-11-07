import { useState } from 'react'


interface HarvestCardProps {
  strainName: string;
  yieldAmount: string;
  potency: string;
  harvestDate: string;
  description: string;
}



function HarvestCard(props: HarvestCardProps) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>Harvest Card</h2>
      <p>Strain Name: {props.strainName}</p>
      <p>Yield: {props.yieldAmount}</p>
      <p>Potency percentage: {props.potency}</p>
      <p>Harvest Date: {props.harvestDate}</p>
      <p>{props.description}</p>
      <button onClick={() => setCount(previousCount => previousCount + 1)}>Like {count}</button>
    </div>
  );
}


export default HarvestCard;
