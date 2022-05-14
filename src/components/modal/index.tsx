import { useClickAway, useRef } from 'hooks'
import { useRecoilState } from 'hooks/state'
import { modalState, IModalState } from 'states/modal'
import { moviesInSearchState } from 'states/movie'
import store from 'store'

import styles from './Modal.module.scss'
import { cn } from 'styles'

import { IMovie } from 'types/movie'

import { addOrRemoveBtnText } from 'assets/texts'

const cx = cn.bind(styles)

const Modal = () => {
  const [modalShow, setModalShow] = useRecoilState<IModalState>(modalState)
  const [moviesInSearch, setMoviesInSearch] = useRecoilState<IMovie[]>(moviesInSearchState)
  const {
    isShow,
    selectedMovie,
    selectedMovie: { imdbID, fav },
  } = modalShow

  const btnText = addOrRemoveBtnText(fav)

  const ref = useRef(null)
  useClickAway(ref, () => {
    setModalShow(prev => ({ ...prev, isShow: false }))
  })

  const handleClick = (isCancelBtn: boolean): void => {
    if (!isCancelBtn) {
      if (fav) {
        const reorderedMovies = store.get('favs').filter(({ imdbID: storeId }: IMovie) => storeId !== imdbID)
        store.set('favs', reorderedMovies)
      } else {
        const prevFavs = store.get('favs')
        prevFavs.push(selectedMovie)
        store.set('favs', prevFavs)
      }

      const updateFavInMovie = moviesInSearch?.map(({ fav: favState, imdbID: id, ...movie }) => ({
        ...movie,
        imdbID: id,
        fav: id === imdbID ? !favState : favState,
      }))
      setMoviesInSearch(updateFavInMovie)
    }
    setModalShow(prev => ({ ...prev, isShow: false }))
  }

  return (
    <div className={cx('overlay', { hide: !isShow })}>
      <section className={styles.content} ref={ref}>
        <button type='button' onClick={() => handleClick(false)}>
          {btnText}
        </button>
        <button type='button' onClick={() => handleClick(true)}>
          취소
        </button>
      </section>
    </div>
  )
}

export default Modal
