import { useSetRecoilState } from 'hooks/state'
import { modalState, IModalState } from 'states/modal'
import { cn } from 'styles'
import styles from './MovieLists.module.scss'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { IMovie } from 'types/movie'
import { NO_RESULTS } from '../../assets/texts'

const cx = cn.bind(styles)

interface Props {
  movieDatas: IMovie[]
}

const MovieLists = ({ movieDatas }: Props) => {
  const setModalShow = useSetRecoilState<IModalState>(modalState)

  const handleClick = (imdbID: string): void => setModalShow({ isShow: true, favId: imdbID })

  return (
    <section className={cx('movieLists', { emptyList: !movieDatas.length })}>
      {movieDatas.length ? (
        movieDatas?.map((movie, idx) => {
          const { Title, Year, Type, Poster, fav, imdbID } = movie
          const keySetting = `${Title}-${idx}`

          return (
            <summary className={styles.movieWrap} key={keySetting} onClick={() => handleClick(imdbID)}>
              {Poster === 'N/A' ? (
                <div className={styles.imgNix} />
              ) : (
                <img className={styles.movieImg} src={Poster} alt={Title} />
              )}
              <div className={styles.movieInfo}>
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
    </section>
  )
}

export default MovieLists
