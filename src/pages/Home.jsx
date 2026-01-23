import Hero from "../components/Hero"
import Navbar from "../components/Navbar"

function Home() {
  return (
    <div className="min-h-screen ">
        {/* navbar */}
        <Navbar/>

      <div className="flex flex-col items-center">
        {/* hero */}
        <Hero/>

        

        {/* Intro */}
        

        
      </div>
    </div>
  )
}

export default Home
