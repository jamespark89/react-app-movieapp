import styled from "@emotion/styled"
import { Box } from "@mui/system"
import { keyframes } from "@mui/system"
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
  position: "absolute"
})

export default function Hero({ HeroMovie }) {
  return (
    <Box sx={{ height: "400px" }}>
      <StyledCarousel>
        {HeroMovie.map((item) => (
          <img
            key={item.id}
            src={item.large_cover_image}
            alt={item.slug}
            style={{
              height: "400px",
              width: "340px"
            }}
          />
        ))}
        {HeroMovie.map((item) => (
          <img
            key={item.id}
            src={item.large_cover_image}
            alt={item.slug}
            style={{ height: "400px", width: "340px" }}
          />
        ))}
      </StyledCarousel>
    </Box>
  )
}
