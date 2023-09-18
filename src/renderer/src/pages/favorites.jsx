import { useEffect } from "react"
import useMovie from "../hooks/useMovie"
import { useData } from "../contexts/data"
import MovieCart from "../components/movieCart"

function Favorites() {

    const {Favorites, getFavorites, pending} = useMovie()
    const {userData} = useData()

    useEffect(() => {
        getFavorites(userData.favorites)
    }, [])

    return (
        <div className="favorites container">
            <div className="list grid">
                {Favorites && Favorites.map(movie => (
                    <div className="item col" key={movie.id}>
                        <MovieCart movie={movie}/>
                    </div>
                ))}

                {pending && (
                    <div className="loading">
                        <p> Loading...</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Favorites