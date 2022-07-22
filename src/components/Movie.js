import PropTypes from "prop-types"
import { Link } from "react-router-dom"

function Movie({ id, coverImg, title, year, rating }) {
  return (
    <div>
      <Link to={`/movie/${id}`}>
        <img src={coverImg} alt={title} />
      </Link>
      <h2>
        {title}({year})
      </h2>
      <p>{rating}</p>
    </div>
  )
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired
}

export default Movie
