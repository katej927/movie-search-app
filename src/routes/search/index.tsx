import { paramsGetMoviesApiState, IParamsGetMoviesApiState, moviesInSearchState } from '../../states/movie'
import { useEffect, useState } from 'hooks'
import { useRecoilState } from 'hooks/state'
import { getMoviesApi } from 'services/movie'
import camelcaseKeys from 'camelcase-keys'
import { IMovie } from 'types/movie'

import MovieLists from 'components/movieLists'

const Search = () => {
  const [paramsGetMoviesApi, setParamsGetMoviesApi] = useRecoilState<IParamsGetMoviesApiState>(paramsGetMoviesApiState)
  const [shownMovies, setShownMovies] = useRecoilState<IMovie[]>(moviesInSearchState)

  const { searchWord, pageNum } = paramsGetMoviesApi

  const [target, setTarget] = useState<HTMLDivElement | null>(null)
  // const Observer = forwardRef<HTMLDivElement>(ref => <div ref={ref} />)
  // Observer.displayName = 'Observer'

  useEffect(() => {
    getMoviesApi(paramsGetMoviesApi).then(res => {
      const { response, search } = camelcaseKeys(res.data)
      const resStatus = JSON.parse(response.toLowerCase())
      const result = search?.map(originalData => ({ ...originalData, fav: false }))

      return setShownMovies(resStatus ? result : [])
    })
  }, [searchWord, pageNum, paramsGetMoviesApi])

  useEffect(() => {
    setParamsGetMoviesApi(prev => ({ ...prev, pageNum: pageNum + 1 }))
  }, [target])

  console.log('shownMovies', shownMovies)

  return <MovieLists movieDatas={shownMovies} />
}

export default Search
