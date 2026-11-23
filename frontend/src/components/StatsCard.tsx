
import type {Stats} from "../types"





export interface StatsCardProps {
    stats : Stats | null
    error : string | null
}







function StatCard(props: StatsCardProps) {

    if (props.error) return <p>{props.error}</p>
    if (!props.stats) return <p>Loading Stats...</p>
    return( 
     <div>
        <p>Total Grade A : {props.stats?.total_grade_a}</p>
        <p>Total Extraction Grams : {props.stats?.total_extraction}</p>
        <p>Total Plants : {props.stats?.total_plants}</p>
        <p>Top Strain : {props.stats?.top_strain}</p>
        <p>Average Grams Per Plant : {props.stats?.avg_grams_per_plant.toFixed(2)}</p>
     </div>)

   

}

export default StatCard