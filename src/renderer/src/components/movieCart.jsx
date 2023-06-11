import { Link } from "react-router-dom"
import { useData } from "../contexts/data"

function MovieCart({movie}) {

    const { setSelectedMovie } = useData()

    return (
        <Link to={`/movie/${movie.id}`} className="movie-cart" onClick={() => setSelectedMovie(movie)}>
            <div className="image">
                <img src={movie.image} />
            </div>
            <div className="info">
                <p className="label">{movie.title}</p>
                <div className="more flex justify-content-between">
                    <p className="date">{movie.year}</p>
                    <p className="country">{movie.country[0].title}</p>
                </div>
            </div>
        </Link >
    )
}

export default MovieCart