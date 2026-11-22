import HarvestCard from './components/HarvestCard'
import './App.css'
import { useState, useEffect  } from 'react'
import HarvestForm from './components/HarvestForm'
import StatsCard from './components/StatsCard'
import { getHarvests } from './api'
import type { Harvest } from './types'



function App() {

 const [harvests, setHarvests] = useState<Harvest[]>([]);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState<boolean>(true);
 const [searchTerm, setSearchTerm] = useState<string>("");
 const [showForm, setShowForm] = useState<boolean>(false);


async function loadHarvests() {
  return getHarvests()
    .then((data) => setHarvests(data))
    .catch((error) => setError(error.message))
    .finally(() => setLoading(false));
}

useEffect(() => {
  loadHarvests()
}, []);


  return (
    <>
      <section id="center">
        <div>
          <h1>Yield Tracker</h1>
          <p>Track your harvest yields efficiently</p>
        </div>
      </section>
      <section id= 'harvestCard'>
        {showForm && <HarvestForm onAdded={loadHarvests} />}
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Add Harvest"}
        </button>
        <div>
          <input 
            type="text" 
            placeholder="Search by cycle number or strain" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          {harvests
            .filter((harvest) => 
              harvest.cycle_number.toString().toLowerCase().includes(searchTerm.toLowerCase()) || 
              harvest.strain?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((harvest) => (
            <HarvestCard 
              key={harvest.cycle_number + ':' +harvest.strain}
              harvest_date={harvest.harvest_date}
              trim_start_date={harvest.trim_start_date}
              cycle_number={harvest.cycle_number}
              strain={harvest.strain}
              grade_a_grams={harvest.grade_a_grams}
              extraction_grams={harvest.extraction_grams}
              plant_count={harvest.plant_count}
              avg_potency_pct={harvest.avg_potency_pct}
              grams_per_plant={harvest.grams_per_plant}
            />
          ))}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && !error && harvests.length === 0 && <p>No harvests found.</p>}
      </section>
      <section id='statsCard'>
        <StatsCard />
      </section>
    </>
  )
}



export default App
