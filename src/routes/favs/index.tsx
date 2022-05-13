import { useRecoilValue } from 'hooks/state'
import { useEffect, useState } from 'hooks'
import { modalState } from 'states/modal'
import { MovieLists } from 'components'
import store from 'store'

import { IMovie } from 'types/movie'

const Favs = () => {
  const modalStatus = useRecoilValue(modalState)
  const [movieLists, setMovieLists] = useState<IMovie[]>([])

  useEffect(() => {
    const collectFavMovies: IMovie[] = []
    store.each(value => collectFavMovies.push(value))
    setMovieLists(collectFavMovies)
  }, [modalStatus])

  return <MovieLists movieDatas={movieLists} />
}

export default Favs
