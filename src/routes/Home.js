import React, { useState } from "react"
import Movie from "../components/Movie"
import Navbar from "../components/Navbar"

function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [loadMore, setLoadMore] = useState(false)

  return (
    <div className="App">
      <Navbar
        setSearchTerm={setSearchTerm}
        setLoadMore={setLoadMore}
      />
      <Movie
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        loadMore={loadMore}
        setLoadMore={setLoadMore}
      />
    </div>
  )
}

export default Home
