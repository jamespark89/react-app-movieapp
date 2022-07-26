import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Movie from "../components/Movie"
import Rating from "@mui/material/Rating"
import StarIcon from "@mui/icons-material/Star"
import LoadingSpinner from "../components/LoadingSpinner"
import { styled } from "@mui/material"
import { API_KEY, IMG_URL } from "../config/config"
import {
  Box,
  Card,
  CardContent,
  Container
} from "@mui/material"

const StyledLoadingSpinner = styled(LoadingSpinner)(
  ({ theme }) => ({
    marginTop: "400px"
  })
)
function Detail() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [movie, setMovie] = useState([])
  const getMovieById = async () => {
    setLoading(true)
    try {
      const json = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        )
      ).json()
      setMovie(json)
    } catch (e) {
      new Error("Network Error")
    }
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
      {loading ? (
        <StyledLoadingSpinner />
      ) : searchTerm !== "" ? (
        <Movie searchTerm={searchTerm} />
      ) : (
        <Box
          sx={{
            backgroundImage: `url(
              https://image.tmdb.org/t/p/w500${movie.backdrop_path}
            )`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "4rem 1rem"
          }}
        >
          <Container
            sx={{
              height: "100%",
              display: { md: "flex" },
              backgroundColor: "rgba(0, 0, 0, 0.5)"
            }}
            disableGutters
          >
            <img
              src={`${IMG_URL}${movie.poster_path}`}
              onError={({ currentTarget }) => {
                if (
                  currentTarget.src !==
                  `${IMG_URL}${movie.backdrop_path}`
                ) {
                  currentTarget.src = `${IMG_URL}${movie.backdrop_path}`
                }
              }}
              alt={movie.title}
              style={{
                objectFit: "cover",
                width: "100%",
                maxHeight: "750px"
              }}
            ></img>

            <Card
              sx={{
                maxWidth: { md: "50%", lg: "60%" },
                backgroundColor: "transparent"
              }}
            >
              <CardContent
                sx={{ fontSize: "20px", color: "white" }}
              >
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0
                  }}
                >
                  <h2>
                    {movie.title}(
                    {movie.release_date?.slice(0, 4)})
                  </h2>
                  <Rating
                    max={10}
                    value={
                      Number(
                        movie.vote_average.toFixed(1)
                      ) || 0
                    }
                    precision={0.1}
                    readOnly
                    emptyIcon={
                      <StarIcon
                        style={{ color: "white" }}
                        fontSize="inherit"
                      />
                    }
                  />
                  <span>
                    {Number(movie.vote_average.toFixed(1))}{" "}
                    / 10
                  </span>
                  <li style={{ marginTop: "1rem" }}>
                    <span>Running Time :</span>
                    {movie.runtime}min
                  </li>
                  <li style={{ marginTop: "0.5rem" }}>
                    <span>Genre : </span>
                    {movie.genres?.map((item, key) => (
                      <span key={key}>{item.name}</span>
                    ))}
                  </li>
                  <li style={{ marginTop: "0.5rem" }}>
                    {movie.overview}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Container>
        </Box>
      )}
    </Box>
  )
}

export default Detail
