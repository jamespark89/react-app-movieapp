import * as React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}))

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
    <Box>
      <h2>
        {searchTerm
          ? `search By "${searchTerm}"`
          : "Recent Movies"}
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
                      src={movie.medium_cover_image}
                      alt={movie.slug}
                    ></img>
                  </Link>
                  <li
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
    </Box>
  )
}

export default Movie
