import MovieCart from "./movieCart"
import useHorizontalScroll from "../hooks/useHorizontalScroll"
import useMovie from "../hooks/useMovie"
import { useEffect } from "react"


function MovieList({movies, title}) {

    const scrollRef = useHorizontalScroll()

    return (
        <div className="movie-list">
            <div className="info">
                <p className="title">
                    {title}
                </p>
            </div>
            <div className="list" ref={scrollRef}>
                {movies && movies.map(movie => (
                    <MovieCart key={movie.id} movie={movie}/>
                ))}
            </div>
        </div>
    )
}


export default MovieList