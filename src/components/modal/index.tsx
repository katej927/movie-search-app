import { useClickAway, useRef } from 'hooks'
import { useRecoilState } from 'hooks/state'
import { modalState, IModalState } from 'states/modal'
import { moviesInSearchState } from 'states/movie'
import store from 'store'

import { IMovie } from 'types/movie'

import { addOrRemoveBtnText } from 'assets/texts'

import styles from './Modal.module.scss'
import { cn } from 'styles'

const cx = cn.bind(styles)

const Modal = () => {
  const [modalShow, setModalShow] = useRecoilState<IModalState>(modalState)
  const [moviesInSearch, setMoviesInSearch] = useRecoilState<IMovie[]>(moviesInSearchState)
  const {
    isShow,
    selectedMovie,
    selectedMovie: { imdbID, fav },
  } = modalShow

  const btnText: string[] = addOrRemoveBtnText(fav)

  const ref = useRef(null)
  useClickAway(ref, () => {
    setModalShow(prev => ({ ...prev, isShow: false }))
  })

  const updateFavInMovie = (movies: IMovie[]): IMovie[] => {
    return movies.map(({ fav: favState, imdbID: id, ...movie }) => ({
      ...movie,
      imdbID: id,
      fav: id === imdbID ? !favState : favState,
    }))
  }

  const handleClick = (isCancelBtn: boolean): void => {
    if (!isCancelBtn) {
      const getFavs = store.get('favs')
      if (fav) {
        const reorderedMovies = getFavs.filter(({ imdbID: storeId }: IMovie) => storeId !== imdbID)
        store.set('favs', updateFavInMovie(reorderedMovies))
      } else {
        const prevFavs = getFavs || []
        prevFavs.push(selectedMovie)
        store.set('favs', updateFavInMovie(prevFavs))
      }

      setMoviesInSearch(updateFavInMovie(moviesInSearch))
    }
    setModalShow(prev => ({ ...prev, isShow: false }))
  }

  return (
    <div className={cx('overlay', { hide: !isShow })}>
      <section className={cx('content')} ref={ref}>
        <span>{btnText[0]}</span>
        <div className={cx('btnWrap')}>
          <button type='button' onClick={() => handleClick(false)}>
            {btnText[1]}
          </button>
          <button type='button' onClick={() => handleClick(true)}>
            취소
          </button>
        </div>
      </section>
    </div>
  )
}

export default Modal
