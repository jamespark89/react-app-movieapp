import * as React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import { styled } from "@mui/material"
import LoadMoreBtn from "./LoadMoreBtn"

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
  loadMore
}) {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [noresult, setNoresult] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [movieCount, setMovieCount] = useState(0)

  const getMoviesByQuery = async () => {
    if (pageNumber > 1 && loadMore === true) {
      const json = await (
        await fetch(
          `https://yts.mx/api/v2/list_movies.json?minimum_rating=3&sort_by=year&query_term=${searchTerm}&page=${pageNumber}`
        )
      ).json()
      setMovieCount(json.data.movie_count)

      //if ther is no more result, pop up alert
      json.data.movies === undefined
        ? alert("No more movies")
        : setMovies((prev) => [
            ...prev,
            ...json.data.movies
          ])
      setLoadMore(false)
    } else {
      setNoresult(false)
      setLoading(true)
      const json = await (
        await fetch(
          `https://yts.mx/api/v2/list_movies.json?minimum_rating=3&sort_by=year&query_term=${searchTerm}`
        )
      ).json()
      //fetch api calls undefined if there is no result??
      json.data.movies === undefined
        ? setNoresult(true)
        : setMovies(json.data.movies)
      setLoading(false)
      setMovieCount(json.data.movie_count)
    }
  }
  useEffect(() => {
    getMoviesByQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, pageNumber])

  return (
    <Box>
      <h2>
        {searchTerm ? (
          <span>
            "{movieCount}" movies search By "{searchTerm}"
          </span>
        ) : (
          "Recent Movies"
        )}
      </h2>
      {loading ? (
        <h2> Loading...</h2>
      ) : noresult ? (
        <h2>No result</h2>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container justifyContent="center">
            {movies.map((movie) => (
              <Grid
                container
                justifyContent="center"
                key={movie.id}
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
