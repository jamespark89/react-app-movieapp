import styled from "@emotion/styled"

import { Box } from "@mui/system"
import { keyframes } from "@mui/system"
import { Link } from "react-router-dom"
const myEffect = keyframes`
 from {
  left:0px
}
to {
  left: -3400px;
}`

const StyledCarousel = styled("div")({
  height: "400px",
  width: "100%",
  display: "flex",
  animation: `${myEffect} linear 60s infinite `,
  position: "relative",
  "&:hover": {
    animationPlayState: "paused"
  },
  "& img": {
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.03)"
    }
  }
})

export default function Hero({ HeroMovie }) {
  return (
    <Box sx={{ height: "400px", overflow: "hidden" }}>
      <StyledCarousel>
        {HeroMovie.map((item) => (
          <Link to={`/movie/${item.id}`} key={item.id}>
            <img
              className="image"
              src={item.large_cover_image}
              alt={item.slug}
              style={{
                height: "400px",
                width: "340px"
              }}
            />
          </Link>
        ))}
        {HeroMovie.map((item) => (
          <Link to={`/movie/${item.id}`} key={item.id}>
            <img
              className="image"
              src={item.large_cover_image}
              alt={item.slug}
              style={{ height: "400px", width: "340px" }}
            />
          </Link>
        ))}
      </StyledCarousel>
    </Box>
  )
}
