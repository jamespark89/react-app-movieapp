import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Movie({ searchTerm }) {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [noresult, setNoresult] = useState(false)
  const getMoviesByQuery = async () => {
    setNoresult(false)
    setLoading(true)
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=3&sort_by=year&query_term=${searchTerm}`
      )
    ).json()
    //fetch api calls undefined if there is no result??
    json.data.movies !== undefined
      ? setMovies(json.data.movies)
      : setNoresult(true)
    setLoading(false)
  }
  useEffect(() => {
    getMoviesByQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  return (
    <div>
      <h1>movies</h1>
      {loading ? (
        <h2> Loading...</h2>
      ) : noresult ? (
        <h2>No result</h2>
      ) : (
        <div>
          {movies.map((movie) => (
            <div key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.medium_cover_image}
                  alt={movie.slug}
                ></img>
              </Link>
              <li>{movie.title_long}</li>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Movie
