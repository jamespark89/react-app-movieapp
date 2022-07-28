import React, { useState } from "react"
import Hero from "../components/Hero"
import Movie from "../components/Movie"
import Navbar from "../components/Navbar"

function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [HeroMovie, setHeroMovie] = useState([])

  return (
    <div className="App">
      <Navbar setSearchTerm={setSearchTerm} />
      {HeroMovie !== [] ? (
        <Hero HeroMovie={HeroMovie} />
      ) : null}
      <Movie
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setHeroMovie={setHeroMovie}
      />
    </div>
  )
}

export default Home
