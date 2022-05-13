import { useEffect, useState } from 'hooks'
import { useRecoilState } from 'hooks/state'
import { paramsGetMoviesApiState, IParamsGetMoviesApiState, moviesInSearchState } from '../../states/movie'

import camelcaseKeys from 'camelcase-keys'
import _ from 'lodash'

import { getMoviesApi } from 'services/movie'
import { IMovie } from 'types/movie'

import { MovieLists } from 'components'

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
      const addFav = search?.map(originalData => ({ ...originalData, fav: false }))
      const result = _.uniqBy(addFav, 'imdbID')

      return setShownMovies(resStatus ? result : [])
    })
  }, [searchWord, pageNum])

  // useEffect(() => {
  //   setParamsGetMoviesApi(prev => ({ ...prev, pageNum: pageNum + 1 }))
  // }, [target])
  return <MovieLists movieDatas={shownMovies} />
}

export default Search
