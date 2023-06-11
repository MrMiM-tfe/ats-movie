import { useEffect } from 'react'
import MovieCart from '../components/movieCart'
import { useSearch } from '../contexts/search'

function Search() {

  const { Result, error, pending } = useSearch()

  return (
    <div className="movies container">
      <div className="list grid">
        {Result?.posters &&
          Result.posters.map((movie) => (
            <div className="item col" key={movie.id}>
              <MovieCart movie={movie} />
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

export default Search
