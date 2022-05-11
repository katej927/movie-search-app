import { useMount, useState } from 'hooks'
import { getMoviesApi } from 'services/movie'
import { ISearch } from 'types/movie'
import styles from './SearchMovie.module.scss'
import MovieLists from 'components/movieLists'

const SearchMovie = () => {
  const [allmovies, setAllMovies] = useState<ISearch[]>()

  useMount(() => {
    getMoviesApi().then(res => setAllMovies(res.data.Search))
  })

  return <MovieLists movieDatas={allmovies} />
}

export default SearchMovie
