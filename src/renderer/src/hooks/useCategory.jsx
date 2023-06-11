import { useState, useEffect } from "react";
import API from "../API"

const useCategory = () => {
    const [Categories, setCategories] = useState([]);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const noCategory = {
        id: 0,
        title: "بدونه دسته بندی"
    }

    const getCategories = async () => {
        setPending(true)

        const {res, err} = await API(`genre/all/4F5A9C3D9A86FA54EACEDDD635185/`)

        if(res){
            setError(null)
            setCategories([noCategory, ...res.data])
        }
        if(err){
            setError(err)
            setCategories(null)
        }

        setPending(false)
    }

    return {Categories, pending, error, getCategories}
}

export default useCategory