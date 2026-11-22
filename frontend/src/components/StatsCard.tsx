
import {useState, useEffect} from "react"
import type {Stats} from "../types"
import { getStats } from "../api"


function StatCard() {
    const [stats, setStats ] = useState<Stats | null>(null)
    const [error, setError] = useState<string | null>(null)





    useEffect(() => {
          getStats()
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