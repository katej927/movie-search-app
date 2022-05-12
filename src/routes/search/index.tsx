import { useMount, useState } from 'hooks'
import { getMoviesApi } from 'services/movie'
import { ISearch } from 'types/movie'
import MovieLists from 'components/movieLists'

const Search = () => {
  const [shownMovies, setShownMovies] = useState<ISearch[]>([])
  // const [target, setTarget] = useState<HTMLDivElement>()
  // const Observer = forwardRef<HTMLDivElement>(ref => <div ref={ref} />)
  // Observer.displayName = 'Observer'

  useMount(() => {
    getMoviesApi({ searchWord: 'iron man', pageNum: 1 }).then(res => setShownMovies(res.data.Search))
  })

  return <MovieLists movieDatas={shownMovies} />
}

export default Search
