import Form from "../components/Form"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"

function Home() {
  return (
    <div className="w-full h-full">
        {/* navbar */}
        <Navbar/>

      <div className="flex flex-col items-center">
        {/* hero */}
        <Hero/>

        {/* form */}
        <Form/>

        {/* Intro */}
        <p className="text-center text-[110%] px-70 mb-10">
  <span className="font-bold italic">Blood Bank Near Me</span> helps you find the nearest and most reliable blood banks instantly. Whether it’s an emergency or regular need, our platform connects you to life-saving resources with just a few clicks.</p>


        
      </div>
    </div>
  )
}

export default Home
