import HarvestCard from './components/HarvestCard'
import './App.css'



function App() {

  return (
    <>
      <section id="center">
        <div>
          <h1>Yield Tracker</h1>
          <p>Track your harvest yields efficiently</p>
        </div>
      </section>
      <section id= 'harvestCard'>
        <div>
          <HarvestCard
            strainName="THEORYx Sunset Sherbert"
            yieldAmount="500g"
            potency="25%"
            harvestDate="2026-06-01"
            description="THEORYx Sunset Sherbert is a hybrid bred by Sherbinskis. This potent bud from Girl Scout Cookies lineage has complex aromas of skunky citrus and sweet berries. It may provide users with a euphoric lift that may ease a racy mind and could also provide potent full body relaxation thanks to its indica dominance."
          />
          <HarvestCard
            strainName="THEORYx Gelato"
            yieldAmount="450g"
            potency="32%"
            harvestDate="2026-06-15"
            description="THEORYx Gelato is a hybrid known for its sweet and fruity aroma. This strain may provide a balanced high that combines euphoria with relaxation, making it suitable for both daytime and evening use."
          />
        </div>
        
      </section>
    </>
  )
}

export default App
