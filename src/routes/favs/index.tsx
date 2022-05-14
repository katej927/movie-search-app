import { useRecoilValue } from 'hooks/state'
import { useEffect, useState } from 'hooks'
import { modalState } from 'states/modal'
import { MovieLists } from 'components'
import store from 'store'

import { IMovie } from 'types/movie'

const Favs = () => {
  const modalStatus = useRecoilValue(modalState)
  const [movieLists, setMovieLists] = useState<IMovie[]>(store.get('favs'))

  useEffect(() => {
    setMovieLists(store.get('favs'))
  }, [modalStatus])

  return <MovieLists movieDatas={movieLists} setMovieLists={setMovieLists} ActiveDnd />
}

export default Favs
