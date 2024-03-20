import { useEffect } from "react"
import MovieList from "../components/movieList"
import useHomeData from "../hooks/useHomeData"

function Home() {

    const {Data, getData, error, pending} = useHomeData()
    
    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="home">
            <div className="data">
                {Data.genres && Data.genres.map((item , i) => (
                    <MovieList key={i} movies={item.posters} title={item.title} />
                ))}
            </div>
        </div>
    )
}

export default Home