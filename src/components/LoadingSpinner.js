import * as React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

const CircleSpinner = ({ className }) => (
  <Box
    className={className}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <CircularProgress />
  </Box>
)

export default CircleSpinner
