import React, { useState } from "react"
import Hero from "../components/Hero"
import Movie from "../components/Movie"
import Navbar from "../components/Navbar"

function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [loadMore, setLoadMore] = useState(false)
  const [HeroMovie, setHeroMovie] = useState([])
  return (
    <div className="App">
      <Navbar
        setSearchTerm={setSearchTerm}
        setLoadMore={setLoadMore}
      />
      <Hero HeroMovie={HeroMovie} />
      <Movie
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        loadMore={loadMore}
        setLoadMore={setLoadMore}
        setHeroMovie={setHeroMovie}
      />
    </div>
  )
}

export default Home
