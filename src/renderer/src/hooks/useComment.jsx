import { useState } from "react"
import API from "../API"

const useComment = () => {
    const [Comments, setComments] = useState(null);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);
    

    const getComments = async (id) => {
        setPending(true)

        const {res, err} = await API(`comments/by/poster/${id}/1`)

        if(res){
            setError(null)
            setComments(res.data)
        }
        if(err){
            setError(err)
            setComments(null)
        }

        setPending(false)
    }

    return {Comments, pending, error, getComments}
}

export default useComment