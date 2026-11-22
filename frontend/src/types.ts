// make src/types.ts
// export interface Harvest with the same fields your backend sends
//   (id, cycle_number, strain, harvest_date, trim_start_date,
//    grade_a_grams, extraction_grams, plant_count, avg_potency_pct, grams_per_plant)
// move your Stats interface here too and export it


export interface Harvest{
    id: number,
    cycle_number : string,
    strain: string,
    harvest_date: string,
    trim_start_date: string,
    grade_a_grams: number,
    extraction_grams: number,
    plant_count: number,
    avg_potency_pct: number | null,
    grams_per_plant: number

}

export interface Stats {
    total_grade_a : number,
    total_extraction : number,
    total_plants : number,
    top_strain : string,
    avg_grams_per_plant: number
}


export type NewHarvest = Omit<Harvest, "grams_per_plant" | "id">