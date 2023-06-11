import { useState } from "react";
import API from "../API"

const useMovie = () => {
    const [Movies, setMovies] = useState([]);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    

    const getMovies = async (order = "created", filter = 0 , getPage = 0) => {
        setPending(true)
        setPage(Math.abs(getPage))

        // check the order
        const orders = ["created", "rating", "imdb", "title" , "view"]
        if (!orders.includes(order)) order = "created"

        const {res, err} = await API(`movie/by/filtres/${filter}/${order}/${page}/1`)

        if(res){
            setError(null)
            setMovies(res.data)
        }
        if(err){
            setError(err)
            setMovies(null)
        }

        setPending(false)
    }

    const getMore = async (order = "created", filter = 0) => {
        setPending(true)
        setPage(page + 1)

        // check the order
        const orders = ["created", "rating", "imdb", "title" , "view"]
        if (!orders.includes(order)) order = "created"

        const {res, err} = await API(`movie/by/filtres/${filter}/${order}/${page + 1}/1`)

        if(res){
            setError(null)
            setMovies([...Movies, ...res.data])
        }
        if(err){
            setError(err)
            setMovies(null)
        }

        setPending(false)
    }

    return {Movies, pending, error, getMovies, getMore}
}

export default useMovie