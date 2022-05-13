import { Dispatch, SetStateAction } from 'react'
import { useSetRecoilState } from 'hooks/state'
import { modalState, IModalState } from 'states/modal'
import { cn } from 'styles'
import styles from './MovieLists.module.scss'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import ReactLoading from 'react-loading'
import { IMovie } from 'types/movie'
import { NO_RESULTS } from '../../assets/texts'

const cx = cn.bind(styles)

interface Props {
  isLoading?: boolean
  isNoResult?: boolean
  movieDatas: IMovie[]
  setTarget?: Dispatch<SetStateAction<HTMLElement | null | undefined>>
}

const MovieLists = ({ movieDatas, setTarget, isNoResult, isLoading }: Props) => {
  const setModalShow = useSetRecoilState<IModalState>(modalState)

  const handleClick = (imdbID: string): void => setModalShow({ isShow: true, favId: imdbID })

  return (
    <section className={cx('movieLists', { emptyList: !movieDatas.length })}>
      {!isNoResult ? (
        movieDatas?.map((movie, idx) => {
          const { Title, Year, Type, Poster, fav, imdbID } = movie
          const keySetting = `${Title}-${idx}`

          return (
            <summary className={cx('movieWrap')} key={keySetting} onClick={() => handleClick(imdbID)}>
              {Poster === 'N/A' ? (
                <div className={cx('imgNix')} />
              ) : (
                <img className={cx('movieImg')} src={Poster} alt={Title} />
              )}
              <div className={cx('movieInfo')}>
                <h3>{Title}</h3>
                <time>
                  {Year} / {Type}
                </time>
                {fav ? <MdFavorite /> : <MdFavoriteBorder />}
              </div>
            </summary>
          )
        })
      ) : (
        <span className={cx('noResults')}>{NO_RESULTS}</span>
      )}
      {movieDatas.length && isLoading && (
        <div className={cx('loading')} ref={setTarget}>
          <ReactLoading type='spinningBubbles' height='45px' width='45px' />
        </div>
      )}
    </section>
  )
}

export default MovieLists
