
import {useState, useEffect} from "react"



interface Stats {
    total_grade_a : number,
    total_extraction: number,
    total_plants: number,
    avg_grams_per_plant: number,
    top_strain: string

}

function StatCard() {
    const [stats, setStats ] = useState<Stats | null>(null)
    const [error, setError] = useState<string | null>(null)





    useEffect(() => {
        fetch("http://127.0.0.1:8000/stats")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok!");
            }
            return response.json();
          })
          .then((data) => setStats(data))
          .catch((error) => setError(error.message))
        


     }, []);

    if (error) return <p>{error}</p>
    if (!stats) return <p>Loading Stats...</p>
    return( 
     <div>
        <p>Total Grade A : {stats?.total_grade_a}</p>
        <p>Total Extraction Grams : {stats?.total_extraction}</p>
        <p>Total Plants : {stats?.total_plants}</p>
        <p>Top Strain : {stats?.top_strain}</p>
        <p>Average Grams Per Plant : {stats?.avg_grams_per_plant.toFixed(2)}</p>
     </div>)

   

}

export default StatCard