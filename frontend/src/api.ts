// const API_URL from import.meta.env.VITE_API_URL
// getHarvests: fetch /harvests, check ok, return JSON typed as Harvest[]
// createHarvest: POST a new harvest, check ok
// getStats: fetch /stats, check ok, return JSON typed as Stats
import type {Stats, Harvest, NewHarvest} from "./types" 


const API_URL = import.meta.env.VITE_API_URL




export async function getHarvests(): Promise<Harvest[]> {
    const response = await fetch(`${API_URL}/harvests`)
    if (!response.ok){
        throw new Error("Network response was not ok!");
    }
    return await response.json()
}

export async function createHarvest(harvest: NewHarvest): Promise<void> {
    const response = await fetch(`${API_URL}/harvests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(harvest)
    })
    if (!response.ok) {
        throw new Error("Network response was not ok!");
    }
}

export async function getStats(): Promise<Stats> {
    const response = await fetch(`${API_URL}/stats`)
    if (!response.ok) {
        throw new Error("Network response was not ok!");
    }
    return await response.json()
}












