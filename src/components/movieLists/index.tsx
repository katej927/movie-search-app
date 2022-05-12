import styles from './MovieLists.module.scss'
import { ISearch } from 'types/movie'

interface Props {
  movieDatas: Array<ISearch>
}

const MovieLists = ({ movieDatas }: Props) => {
  return (
    <section className={styles.MovieLists}>
      {movieDatas?.map((movie, idx) => {
        const { Title, Year, Type, Poster } = movie
        const keySetting = `${Title}-${idx}`

        return (
          <summary className={styles.movieWrap} key={keySetting}>
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
      })}
    </section>
  )
}

export default MovieLists
