import { Button } from "@mui/material"
import { Box } from "@mui/system"
import * as React from "react"
import LoadingSpinner from "../components/LoadingSpinner"

function LoadMoreBtn({
  setMovies,
  setPageNumber,
  setLoadMore,
  loadMore
}) {
  const loadMoreMovies = () => {
    setPageNumber((prev) => prev + 1)
    setLoadMore(true)
  }
  return (
    <Box
      sx={{
        textAlign: "center",
        margin: "2rem"
      }}
    >
      {loadMore ? (
        <LoadingSpinner />
      ) : (
        <Button
          onClick={loadMoreMovies}
          variant="contained"
          sx={{ margin: "auto" }}
        >
          Load More
        </Button>
      )}
    </Box>
  )
}

export default LoadMoreBtn
