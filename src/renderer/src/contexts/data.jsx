import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import API from '../API'

const dataTemplate = { favorites: [], watched: [] }

// create cart context
const DataContext = createContext()

const DataProvider = ({ children }) => {
  // States
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [userData, setUserData] = useState(dataTemplate)

  const getUserData = () => {
    const data = window.api.getUserData()
    if (data) setUserData(data)
  }

  const addFav = (id = selectedMovie) => {
    const data = window.api.addFav(id)
    if (data) setUserData(data)
  }

  const delFav = (id = selectedMovie) => {
    const data = window.api.delFav(id)
    if (data) setUserData(data)
  }

  const markAsWatched = (id) => {
    const data = window.api.markAsWatched(id)
    if (data) setUserData(data)
  }

  const markAsUnwatched = (id) => {
    const data = window.api.markAsUnwatched(id)
    if (data) setUserData(data)
  }
  
  const value = {
    selectedMovie,
    userData,
    setSelectedMovie,
    setUserData,
    addFav,
    delFav,
    markAsWatched,
    markAsUnwatched,
    getUserData
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

const useData = () => useContext(DataContext)
export { useData, DataProvider }
