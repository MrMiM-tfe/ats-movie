import { useState, useEffect } from "react";
import API from "../API"

const useHomeData = () => {
    const [Data, setData] = useState([]);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const getData = async () => {
        setPending(true)

        const {res, err} = await API(`first/1`)

        if(res){
            setError(null)
            setData(res.data)
        }
        if(err){
            setError(err)
            setData(null)
        }

        setPending(false)
    }

    return {Data, pending, error, getData}
}

export default useHomeData