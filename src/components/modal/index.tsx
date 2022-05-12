import { useClickAway, useRef } from 'hooks'
import { useRecoilState, useSetRecoilState } from 'hooks/state'
import { modalState, IModalState } from 'states/modal'
import { moviesInSearchState } from 'states/movie'
import { addOrRemoveBtnText } from 'assets/texts'

import styles from './Modal.module.scss'
import { cn } from 'styles'

import { IMovie } from 'types/movie'

const cx = cn.bind(styles)

const Modal = () => {
  const [modalShow, setModalShow] = useRecoilState<IModalState>(modalState)
  const [moviesInSearch, setMoviesInSearch] = useRecoilState<IMovie[]>(moviesInSearchState)
  const { isShow, favId } = modalShow

  const selectedMovieFav = moviesInSearch?.filter(movie => movie.imdbID === favId)[0].fav
  const btnText = addOrRemoveBtnText(selectedMovieFav)

  const ref = useRef(null)
  useClickAway(ref, () => {
    setModalShow(prev => ({ ...prev, isShow: false }))
  })

  const handleClick = (isCancelBtn: boolean): void => {
    if (!isCancelBtn) {
      const updateFavInMovie = moviesInSearch?.map(({ fav, imdbID, ...movie }) => ({
        ...movie,
        imdbID,
        fav: imdbID === favId ? !fav : fav,
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
