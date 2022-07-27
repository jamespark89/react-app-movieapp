import * as React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import { styled } from "@mui/material"
import LoadMoreBtn from "./LoadMoreBtn"
import { useParams } from "react-router-dom"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  textAlign: "center",
  maxWidth: "300px",
  color: theme.palette.text.secondary,
  "&:hover": {
    transform: "scale(1.1)",
    backgroundColor: theme.palette.primary.dark,
    "& .movieTitle": {
      color: "white"
    }
  }
}))

function Movie({
  setSearchTerm,
  searchTerm,
  setLoadMore,
  loadMore,
  setHeroMovie
}) {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [noresult, setNoresult] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [movieCount, setMovieCount] = useState(0)
  //fetch data
  const getMoviesInit = async () => {
    setLoading(true)
    await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=8&sort_by=year&`
    )
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.data.movies)
        if (id == null) {
          setHeroMovie(res.data.movies)
        }
      })
      .catch((error) => new Error("Network Error"))
    setLoading(false)
  }
  const getMoviesbyQuery = async () => {
    setLoading(true)
    setNoresult(false)
    await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=3&sort_by=year&query_term=${searchTerm}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data.movies === undefined) {
          setNoresult(true)
        } else {
          setMovies(res.data.movies)
          setMovieCount(res.data.movie_count)
        }
      })
      .catch((error) => new Error("Network Error"))
    setLoading(false)
  }
  const loadMoreMovie = async () => {
    await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=3&sort_by=year&query_term=${searchTerm}&page=${pageNumber}`
    )
      .then((res) => res.json())
      .then((res) => res.data)
      .then((data) => {
        if (data.movies === undefined) {
          alert("No more movies")
        } //if ther is no more result, pop up alert
        else {
          setMovies((prev) => [...prev, ...data.movies])
          setMovieCount(data.movie_count)
        }
      })
      .catch((error) => new Error("Network Error"))
    setLoading(false)
    setLoadMore(false)
  }
  useEffect(() => {
    getMoviesInit().catch((error) =>
      alert("please try later")
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    getMoviesbyQuery().catch((error) =>
      alert("please try later")
    )
    setPageNumber(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])
  useEffect(() => {
    if (pageNumber > 1 && loadMore) {
      loadMoreMovie().catch((error) =>
        alert("please try later")
      )
      setLoadMore(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber])
  return (
    <Box sx={{ margin: "1rem" }}>
      {loading ? (
        <h2> Loading...</h2>
      ) : noresult ? (
        <h2>No result by "{searchTerm}"</h2>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <h2>
            {searchTerm ? (
              <span>
                "{movieCount}" movies search By "
                {searchTerm}"
              </span>
            ) : (
              "Recent Movies"
            )}
          </h2>
          <Grid container justifyContent="center">
            {movies.map((movie, index) => (
              <Grid
                container
                justifyContent="center"
                key={index}
                item
                xs={12}
                sm={6}
                md={3}
                lg={2.4}
              >
                <Item>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      loading="lazy"
                      src={movie.medium_cover_image}
                      alt={movie.slug}
                      style={{ maxWidth: "100%" }}
                    ></img>
                  </Link>
                  <li
                    className="movieTitle"
                    style={{
                      listStyleType: "none",
                      maxWidth: "230px"
                    }}
                  >
                    {movie.title_long}
                  </li>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <LoadMoreBtn
        setMovies={setMovies}
        setPageNumber={setPageNumber}
        setLoadMore={setLoadMore}
      />
    </Box>
  )
}

export default Movie
