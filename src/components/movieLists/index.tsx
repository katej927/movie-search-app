import { useSetRecoilState } from 'hooks/state'
import { modalState, IModalState } from 'states/modal'
import { cn } from 'styles'
import styles from './MovieLists.module.scss'
import { ISearch } from 'types/movie'
import { NO_RESULTS } from '../../assets/texts'

const cx = cn.bind(styles)

interface Props {
  movieDatas: ISearch[]
}

const MovieLists = ({ movieDatas }: Props) => {
  const setModalShow = useSetRecoilState<IModalState>(modalState)

  const handleClick = () => setModalShow({ isShow: true, isInFavs: true })

  return (
    <section className={cx('movieLists', { emptyList: !movieDatas.length })}>
      {movieDatas.length ? (
        movieDatas?.map((movie, idx) => {
          const { Title, Year, Type, Poster } = movie
          const keySetting = `${Title}-${idx}`

          return (
            <summary className={styles.movieWrap} key={keySetting} onClick={() => handleClick()}>
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
