import { useEffect } from "react"
import useHorizontalScroll from "../hooks/useHorizontalScroll"
import useCategory from "../hooks/useCategory"

function CategoryList() {

    const scrollRef = useHorizontalScroll()

    const {Categories, getCategories, error, pending} = useCategory()

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className="category-list">
            <div className="info">
                <p className="title">
                    دسته ها
                </p>
            </div>
            <div className="list" ref={scrollRef}>
                {Categories && Categories.map((category, i) => (
                    <div className="item" key={i}>
                        {category.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryList