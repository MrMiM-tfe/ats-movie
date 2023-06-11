import { useState } from "react";
import API from "../API"

const useSerie = () => {
    const [Series, setSeries] = useState([]);
    const [Seasons, setSeasons] = useState([]);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    

    const getSeries = async (order = "created", filter = 0 , getPage = 0) => {
        setPending(true)
        setPage(Math.abs(getPage))

        // check the order
        const orders = ["created", "rating", "imdb", "title" , "view"]
        if (!orders.includes(order)) order = "created"

        const {res, err} = await API(`serie/by/filtres/${filter}/${order}/${page}/1`)

        if(res){
            setError(null)
            setSeries(res.data)
        }
        if(err){
            setError(err)
            setSeries(null)
        }

        setPending(false)
    }

    const getMore = async (order = "created", filter = 0) => {
        setPending(true)
        setPage(page + 1)

        // check the order
        const orders = ["created", "rating", "imdb", "title" , "view"]
        if (!orders.includes(order)) order = "created"

        const {res, err} = await API(`serie/by/filtres/${filter}/${order}/${page + 1}/1`)

        if(res){
            setError(null)
            setSeries([...Series, ...res.data])
        }
        if(err){
            setError(err)
            setSeries(null)
        }

        setPending(false)
    }

    const getSeasons = async (id) => {
        setPending(true)
        
        const {res, err} = await API(`season/by/serie/${id}/1`)

        if(res){
            setError(null)
            setSeasons(res.data)
        }
        if(err){
            setError(err)
            setSeasons(null)
        }

        setPending(false)
    }

    return {Series, pending, error, getSeries, getMore, getSeasons, Seasons}
}

export default useSerie