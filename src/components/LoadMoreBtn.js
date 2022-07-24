import { Button } from "@mui/material"
import { Box } from "@mui/system"
import * as React from "react"

function LoadMoreBtn({
  setMovies,
  setPageNumber,
  setLoadMore
}) {
  const loadMore = () => {
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
      <Button
        onClick={loadMore}
        variant="contained"
        sx={{ margin: "auto" }}
      >
        Load More
      </Button>
    </Box>
  )
}

export default LoadMoreBtn
