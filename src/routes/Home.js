import { useEffect, useState } from "react"
import Movie from "../components/Movie"

function Home() {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`
      )
    ).json()
    setMovies(json.data.movies)
    if (movies !== []) setLoading(false)
  }
  const inputHandler = (e) => {
    setSearchTerm(e.target.value.toLowerCase())
  }
  useEffect(() => {
    getMovies()
  }, [searchTerm])

  console.log(movies)
  return (
    <div className="App">
      <input
        onChange={inputHandler}
        value={searchTerm}
        placeholder=""
      ></input>
      {loading || movies == null ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {searchTerm}
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
