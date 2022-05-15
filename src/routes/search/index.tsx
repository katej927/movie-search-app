import { useEffect, useState, useCallback, memo } from 'hooks'
import { useRecoilState } from 'hooks/state'
import { paramsGetMoviesApiState, IParamsGetMoviesApiState, moviesInSearchState } from '../../states/movie'
import camelcaseKeys from 'camelcase-keys'
import _ from 'lodash'
import store from 'store'

import { getMoviesApi } from 'services/movie'
import { IMovie, ISearch } from 'types/movie'

import { MovieList } from 'components'

const Search = () => {
  const [paramsGetMoviesApi, setParamsGetMoviesApi] = useRecoilState<IParamsGetMoviesApiState>(paramsGetMoviesApiState)
  const [shownMovies, setShownMovies] = useRecoilState<IMovie[]>(moviesInSearchState)
  const { pageNum } = paramsGetMoviesApi

  const [isLoading, setIsLoading] = useState(false)
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null)
  const [isNoResult, setIsNoResult] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)

    getMoviesApi(paramsGetMoviesApi).then(res => {
      const { response, search, totalResults } = camelcaseKeys(res.data)
      const { pageNum: pageNumber } = paramsGetMoviesApi

      const lengthOfGotMovies = shownMovies.length ?? 0 + search.length ?? 0
      const isGetAll = lengthOfGotMovies === Number(totalResults)
      const isCorrectlyGetNext = (Number(totalResults) / 10) * pageNumber === lengthOfGotMovies
      setIsLoading(!isGetAll || !isCorrectlyGetNext)

      const resResultWithFav = _.uniqBy(handleCheckMoviesInFavs(search), 'imdbID')

      const resStatus = JSON.parse(response.toLowerCase())

      setIsNoResult(!resStatus)
      if (!resStatus) setShownMovies([])
      if (pageNumber === 1) setShownMovies(resResultWithFav)
      if (pageNumber > 1) setShownMovies(shownMovies.concat(resResultWithFav))
    })

    setIsLoading(false)
  }, [paramsGetMoviesApi, setShownMovies])

  function handleCheckMoviesInFavs(search: ISearch[]) {
    const getFavs = store.get('favs')
    const inFavsID: string[] = getFavs ? getFavs.map(({ imdbID }: IMovie) => imdbID) : []

    return search?.map(({ imdbID, ...originalData }) => ({
      ...originalData,
      imdbID,
      fav: !!inFavsID.includes(imdbID),
    }))
  }

  const callback: IntersectionObserverCallback = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting && target) {
        setTimeout(() => {
          setParamsGetMoviesApi(prev => ({ ...prev, pageNum: pageNum + 1 }))
        }, 1000)
        observer.observe(target)
      }
    },
    [setParamsGetMoviesApi, pageNum, target]
  )

  // 무한 스크롤
  useEffect(() => {
    let observer: IntersectionObserver
    if (target) {
      observer = new IntersectionObserver(callback, { threshold: 1 })
      observer.observe(target)
    }
    return () => observer && observer.disconnect()
  }, [target, callback])

  return (
    <MovieList
      movieDatas={shownMovies}
      setTarget={setTarget}
      isNoResult={isNoResult}
      isLoading={isLoading}
      ActiveDnd={false}
    />
  )
}

export default memo(Search)
