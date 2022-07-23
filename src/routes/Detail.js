import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Movie from "../components/Movie"

function Detail() {
  const { id } = useParams()
  const [searchTerm, setSearchTerm] = useState([])
  const [movie, setMovie] = useState([])
  const getMovieById = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      )
    ).json()
    setMovie(json.data.movie)
  }
  useEffect(() => {
    getMovieById()
    setMovie([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <div>
      <Navbar setSearchTerm={setSearchTerm} id={id} />
      {!searchTerm ? (
        <>
          <h1>Detail</h1>
          <ul>
            <li>
              <img
                src={movie.large_cover_image}
                alt={movie.slug}
              ></img>
            </li>
            <li>{movie.title_long}</li>
            <li>{movie.rating}</li>
            <li>{movie.runtime}</li>
            {movie.genres > 1
              ? movie.genres.map((item) => <li>{item}</li>)
              : movie.genres}

            <li>{movie.title}</li>
          </ul>
        </>
      ) : (
        <Movie searchTerm={searchTerm} />
      )}
    </div>
  )
}

export default Detail
