import { useState } from "react"
import Movie from "../components/Movie"
import Navbar from "../components/Navbar"

function Home() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="App">
      <Navbar setSearchTerm={setSearchTerm} />
      <div>
        <Movie searchTerm={searchTerm} />
      </div>
    </div>
  )
}

export default Home
