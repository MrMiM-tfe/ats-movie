import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import API from '../API'

// create cart context
const SearchContext = createContext()

const SearchProvider = ({ children }) => {
  // States
  const [searchText, setSearchText] = useState('')
  const [Result, setResult] = useState(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  const search = async () => {
    setPending(true)

    const { res, err } = await API(`search/${searchText}/1`)

    if (res) {
      setError(null)
      setResult(res.data)
    }
    if (err) {
      setError(err)
      setResult(null)
    }

    setPending(false)
  }

  useEffect(() => {
    if (location.pathname != '/search' && searchText !== '') {
      navigate('/search')
    }
    if (searchText === ''  && location.pathname === '/search') {
        navigate("/")
    }
    search()
  }, [searchText])

  const value = {
    searchText,
    setSearchText,
    search,
    Result,
    error,
    pending
  }

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

const useSearch = () => useContext(SearchContext)
export { useSearch, SearchProvider }
