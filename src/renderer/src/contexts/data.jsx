import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import API from '../API'

// create cart context
const DataContext = createContext()

const DataProvider = ({ children }) => {
  // States
  const [selectedMovie, setSelectedMovie] = useState(null)
  
  const value = {
    selectedMovie,
    setSelectedMovie
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

const useData = () => useContext(DataContext)
export { useData, DataProvider }
