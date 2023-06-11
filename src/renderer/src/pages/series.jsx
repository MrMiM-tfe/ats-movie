import { useEffect, useState } from "react"
import MovieCart from "../components/movieCart"
import { Dropdown } from 'primereact/dropdown';
import useCategory from "../hooks/useCategory";
import useSerie from "../hooks/useSerie";

function Series() {

    const orders = ["created", "rating", "imdb", "title" , "view"]

    const [order, setOrder] = useState("created");
    const [filter, setFilter] = useState(0);    

    const {Series, getSeries, getMore, error, pending} = useSerie()
    const {Categories, getCategories} = useCategory()

    useEffect(() => {
        getCategories()
        getSeries(order, filter)
    }, [filter, order])

    const handleScroll = (e) => {
        const isEnd = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (isEnd) getMore()   
    }
    
    return (
        <div className="series container" onScroll={handleScroll}>
            <div className="filters">
                <Dropdown value={filter} onChange={(e) => setFilter(e.value)} options={Categories} optionLabel="title"  optionValue="id" className="filter w-full md:w-14rem" />
                <Dropdown value={order} onChange={(e) => setOrder(e.value)} options={orders} className="order w-full md:w-14rem" />
            </div>
            <div className="list grid">
                {Series && Series.map(movie => (
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

export default Series