import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Movie from "../components/Movie"
import Rating from "@mui/material/Rating"
import { Box, Card, CardContent } from "@mui/material"
import { Container } from "@mui/system"

function Detail() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [movie, setMovie] = useState([])
  const getMovieById = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
      )
    ).json()
    setMovie(json.data.movie)
    setLoading(false)
  }
  useEffect(() => {
    getMovieById()
    setMovie([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Box>
      <Navbar setSearchTerm={setSearchTerm} id={id} />
      {searchTerm !== "" ? (
        <Movie searchTerm={searchTerm} />
      ) : loading ? (
        <h1>Loading...</h1>
      ) : (
        <Box
          sx={{
            backgroundImage: `url(${movie.background_image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { md: "flex" }
          }}
        >
          <Container
            sx={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <img
              src={movie.large_cover_image}
              alt={movie.slug}
              style={{ maxWidth: "100%", margin: "1rem" }}
            ></img>
          </Container>
          <Card sx={{ maxWidth: { md: "50%", lg: "60%" } }}>
            <CardContent sx={{ fontSize: "20px" }}>
              <ul style={{ listStyleType: "none" }}>
                <h2>{movie.title_long}</h2>
                <Rating
                  max={10}
                  value={movie.rating || 0}
                  precision={0.1}
                  readOnly
                />

                <span>{movie.rating}</span>

                <li style={{ marginTop: "1rem" }}>
                  <span>Running Time :</span>
                  {movie.runtime}
                </li>
                <li style={{ marginTop: "0.5rem" }}>
                  <span>Genre : </span>
                  {movie.genres.length > 1
                    ? movie.genres.map((item, key) => (
                        <span key={key}>{item} </span>
                      ))
                    : movie.genres}
                </li>
                <li style={{ marginTop: "0.5rem" }}>
                  {movie.description_full}
                </li>
              </ul>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  )
}

export default Detail
