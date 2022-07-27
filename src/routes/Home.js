import React, { useState } from "react"
import Hero from "../components/Hero"
import Movie from "../components/Movie"
import Navbar from "../components/Navbar"
import LoadingSpinner from "../components/Loading"

function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [loadMore, setLoadMore] = useState(false)
  const [HeroMovie, setHeroMovie] = useState([])
  const [loading, setLoading] = useState(true)
  return (
    <div className="App">
      <Navbar
        setSearchTerm={setSearchTerm}
        setLoadMore={setLoadMore}
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Hero HeroMovie={HeroMovie} />
      )}
      <Movie
        loading={loading}
        setLoading={setLoading}
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
