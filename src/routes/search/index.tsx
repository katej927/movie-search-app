import { useMount, useState } from 'hooks'
import { getMoviesApi } from 'services/movie'
import { ISearch } from 'types/movie'
import styles from './Search.module.scss'
import MovieLists from 'components/movieLists'

const Search = () => {
  const [allmovies, setAllMovies] = useState<ISearch[]>()

  useMount(() => {
    getMoviesApi().then(res => setAllMovies(res.data.Search))
  })

  return <MovieLists movieDatas={allmovies} />
}

export default Search
