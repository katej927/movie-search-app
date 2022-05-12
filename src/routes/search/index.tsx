import { paramsGetMoviesApiState, IParamsGetMoviesApiState } from '../../states/movie'
import { useEffect, useState } from 'hooks'
import { useRecoilState } from 'hooks/state'
import { getMoviesApi } from 'services/movie'
import camelcaseKeys from 'camelcase-keys'
import { ISearch } from 'types/movie'

import MovieLists from 'components/movieLists'

const Search = () => {
  const [paramsGetMoviesApi, setParamsGetMoviesApi] = useRecoilState<IParamsGetMoviesApiState>(paramsGetMoviesApiState)
  const { searchWord, pageNum } = paramsGetMoviesApi

  const [shownMovies, setShownMovies] = useState<ISearch[]>([])
  const [target, setTarget] = useState<HTMLDivElement | null>(null)
  // const Observer = forwardRef<HTMLDivElement>(ref => <div ref={ref} />)
  // Observer.displayName = 'Observer'

  useEffect(() => {
    getMoviesApi(paramsGetMoviesApi).then(res => {
      const { response, search } = camelcaseKeys(res.data)
      const resStatus = JSON.parse(response.toLowerCase())
      return setShownMovies(resStatus ? search : [])
    })
  }, [paramsGetMoviesApi])

  useEffect(() => {
    setParamsGetMoviesApi(prev => ({ ...prev, pageNum: pageNum + 1 }))
  }, [target])

  return <MovieLists movieDatas={shownMovies} />
}

export default Search
