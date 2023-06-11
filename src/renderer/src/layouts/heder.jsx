import { Link } from "react-router-dom"
import { useSearch } from "../contexts/search"

function NavItem({label, to}) {
    return (
        <Link to={to} className="item">
            {label}
        </Link>
    )
}

function Header() {

    const { searchText, setSearchText } = useSearch()

    return (
        <div className="header container">
            <div className="main grid">
                <div className="logo col-3">
                    ATS Movie
                </div>
                <div className="search col-6">
                    <input type="text" value={searchText} onChange={e => {setSearchText(e.target.value)}} />
                    <i className="pi pi-search"></i>
                </div>
            </div>
            <div className="nav">
                <NavItem label="Home" to="/"/>
                <NavItem label="Movies" to="/movies"/>
                <NavItem label="Series" to="/series"/>
                <NavItem label="About" to="/about"/>
            </div>
        </div>
    )
}

export default Header