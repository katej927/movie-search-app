import { useEffect, useState, memo } from 'hooks'
import { useRecoilValue } from 'hooks/state'
import { modalState, IModalState } from 'states/modal'
import { MovieList } from 'components'
import store from 'store'

import { IMovie } from 'types/movie'

const Favs = () => {
  const modalStatus = useRecoilValue<IModalState>(modalState)
  const [movieList, setMovieList] = useState<IMovie[]>(store.get('favs'))

  useEffect(() => {
    setMovieList(store.get('favs'))
  }, [modalStatus])

  return <MovieList movieDatas={movieList} setMovieLists={setMovieList} ActiveDnd />
}

export default memo(Favs)
