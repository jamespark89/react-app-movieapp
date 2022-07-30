import * as React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import { styled } from "@mui/material"
import LoadMoreBtn from "./LoadMoreBtn"
import { useParams } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../state/index"

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

function Movie({ searchTerm, setHeroMovie }) {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [noresult, setNoresult] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [movieCount, setMovieCount] = useState(0)
  const [loadMore, setLoadMore] = useState(false)
  const movies = useSelector((state) => state.movies)
  const dispatch = useDispatch()
  const { loadMovies, loadMoreMovies } = bindActionCreators(
    actionCreators,
    dispatch
  )
  //fetch data
  const getMoviesInit = async () => {
    setLoading(true)
    setPageNumber(1)
    await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=78bce36c26d02da0ee348cdbbe4f56fc&status=Released`
    )
      .then((res) => res.json())
      .then((res) => res.results)
      .then((movies) => {
        loadMovies(movies)
        if (id == null) {
          setHeroMovie(movies)
        }
      })
      .then(() => setLoading(false))
      .catch((error) => {
        alert("Network Error, please try later")
      })
  }
  const getMoviesbyQuery = async () => {
    setLoading(true)
    setNoresult(false)
    await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=78bce36c26d02da0ee348cdbbe4f56fc&query=${searchTerm}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.total_results === 0) {
          setNoresult(true)
        } else {
          loadMovies(data.results)
          setMovieCount(data.total_results)
        }
      })
      .then(() => setLoading(false))
      .catch((error) => {
        alert("Network Error, please try later")
      })
  }
  const loadMoreMovie = async () => {
    let data = ""
    if (searchTerm === "") {
      data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=78bce36c26d02da0ee348cdbbe4f56fc&page=${pageNumber}`
      )
    } else {
      data = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=78bce36c26d02da0ee348cdbbe4f56fc&query=${searchTerm}&page=${pageNumber}`
      )
    }
    data
      .json()
      .then((data) => {
        if (data.results.length === 0) {
          alert("No more movies") //if ther is no more result, pop up alert
        } else {
          loadMoreMovies(data.results)
          setMovieCount(data.total_results)
        }
      })
      .then(setLoading(false))
      .catch((error) => new Error("Network Error"))
    setLoadMore(false)
  }
  useEffect(() => {
    if (searchTerm === "") getMoviesInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (searchTerm !== "") getMoviesbyQuery()
    setPageNumber(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])
  useEffect(() => {
    if (pageNumber > 1 && loadMore) {
      loadMoreMovie()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber])

  return (
    <Box sx={{ margin: "1rem" }}>
      {loading ? (
        <LoadingSpinner />
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
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      onError={({ currentTarget }) => {
                        if (
                          currentTarget.src !==
                          `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                        ) {
                          currentTarget.src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                        }
                      }}
                      alt={movie.title}
                      style={{
                        maxWidth: "100%"
                      }}
                    ></img>
                  </Link>
                  <li
                    className="movieTitle"
                    style={{
                      listStyleType: "none",
                      maxWidth: "230px"
                    }}
                  >
                    {movie.title}(
                    {movie.release_data !== undefined
                      ? movie.release_date.slice(0, 4)
                      : null}
                    )
                  </li>
                </Item>
              </Grid>
            ))}
          </Grid>
          <LoadMoreBtn
            setMovies={loadMovies}
            setPageNumber={setPageNumber}
            setLoadMore={setLoadMore}
            loadMore={loadMore}
          />
        </Box>
      )}
    </Box>
  )
}

export default Movie
