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

  const [isLoading, setIsLoading] = useState(false) // 수정 필요
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null)
  const [isNoResult, setIsNoResult] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    // setTimeout(() => {
    getMoviesApi(paramsGetMoviesApi).then(res => {
      const { response, search, totalResults } = camelcaseKeys(res.data)

      const lengthOfGotMovies = shownMovies.length + search.length
      const isGetAll = lengthOfGotMovies === Number(totalResults)
      const isCorrectlyGetNext = (Number(totalResults) / 10) * pageNum === lengthOfGotMovies
      setIsLoading(!isGetAll || !isCorrectlyGetNext)

      const addFavProp = search?.map(originalData => ({ ...originalData, fav: false }))
      const resResultWithFav = _.uniqBy(addFavProp, 'imdbID')

      const resStatus = JSON.parse(response.toLowerCase())

      setIsNoResult(!resStatus)
      if (!resStatus) setShownMovies([])
      if (pageNum === 1) setShownMovies(resResultWithFav)
      if (pageNum > 1) setShownMovies(shownMovies.concat(resResultWithFav))
    })
    // }, 1000)
    setIsLoading(false)
  }, [searchWord, pageNum])

  // 무한 스크롤
  useEffect(() => {
    let observer: IntersectionObserver
    if (target) {
      observer = new IntersectionObserver(callback, { threshold: 1 })
      observer.observe(target)
    }
    return () => observer && observer.disconnect()
  }, [target])

  const callback: IntersectionObserverCallback = ([entry], observer) => {
    if (entry.isIntersecting && target) {
      setParamsGetMoviesApi(prev => ({ ...prev, pageNum: pageNum + 1 }))
      observer.observe(target)
    }
  }
  return <MovieLists movieDatas={shownMovies} setTarget={setTarget} isNoResult={isNoResult} isLoading={isLoading} />
}

export default Search
