import { useEffect, useState } from 'hooks'
import { useRecoilState } from 'hooks/state'
import { paramsGetMoviesApiState, IParamsGetMoviesApiState, moviesInSearchState } from '../../states/movie'

import { getMoviesApi } from 'services/movie'
import { IMovie, ISearch } from 'types/movie'

import camelcaseKeys from 'camelcase-keys'
import _ from 'lodash'
import store from 'store'

import { MovieLists } from 'components'

const Search = () => {
  const [paramsGetMoviesApi, setParamsGetMoviesApi] = useRecoilState<IParamsGetMoviesApiState>(paramsGetMoviesApiState)
  const [shownMovies, setShownMovies] = useRecoilState<IMovie[]>(moviesInSearchState)
  const { searchWord, pageNum } = paramsGetMoviesApi

  const [isLoading, setIsLoading] = useState(false)
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null)
  const [isNoResult, setIsNoResult] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    getMoviesApi(paramsGetMoviesApi).then(res => {
      const { response, search, totalResults } = camelcaseKeys(res.data)

      const lengthOfGotMovies = shownMovies.length ?? 0 + search.length ?? 0
      const isGetAll = lengthOfGotMovies === Number(totalResults)
      const isCorrectlyGetNext = (Number(totalResults) / 10) * pageNum === lengthOfGotMovies
      setIsLoading(!isGetAll || !isCorrectlyGetNext)

      const resResultWithFav = _.uniqBy(handleCheckMoviesInFavs(search), 'imdbID')

      const resStatus = JSON.parse(response.toLowerCase())
      setIsNoResult(!resStatus)
      if (!resStatus) setShownMovies([])
      if (pageNum === 1) setShownMovies(resResultWithFav)
      if (pageNum > 1) setShownMovies(shownMovies.concat(resResultWithFav))
    })
    setIsLoading(false)
  }, [searchWord, pageNum])

  function handleCheckMoviesInFavs(search: ISearch[]) {
    const inFavsID: string[] = store.get('favs').map(({ imdbID }: IMovie) => imdbID)

    return search?.map(({ imdbID, ...originalData }) => ({
      ...originalData,
      imdbID,
      fav: !!inFavsID.includes(imdbID),
    }))
  }

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
      setTimeout(() => {
        setParamsGetMoviesApi(prev => ({ ...prev, pageNum: pageNum + 1 }))
      }, 1000)
      observer.observe(target)
    }
  }
  return (
    <MovieLists
      movieDatas={shownMovies}
      setTarget={setTarget}
      isNoResult={isNoResult}
      isLoading={isLoading}
      ActiveDnd={false}
    />
  )
}

export default Search
