import { Link } from 'react-router-dom'
import { useData } from '../contexts/data'
import SingleMovie from './singeMovie'
import { useEffect, useState } from 'react'

function MovieCart({ movie }) {
  const { setSelectedMovie } = useData()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        setVisible(false)
      }
    }

    // Add event listener when the component mounts
    document.addEventListener('keydown', handleKeyPress)

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <>
      {visible && (
        <div
          className="single-movie-card-bg"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setVisible(false)
            }
          }}
        >
          <div className="single-movie-card">
            <SingleMovie />
          </div>
        </div>
      )}
      <Link
        to={`/movie/${movie.id}`}
        className="movie-cart"
        onClick={(e) => {
          e.preventDefault()
          setSelectedMovie(movie)
          setVisible(true)
        }}
      >
        <div className="image">
          <img src={movie.image} />
        </div>
        <div className="info">
          <p className="label">{movie.title}</p>
          <div className="more flex justify-content-between">
            <p className="date">{movie.year}</p>
            <p className="country">{movie.country[0].title}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default MovieCart
