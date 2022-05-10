import styles from './MovieLists.module.scss'
import { ISearch } from "types/movie"

interface Props {
    movieDatas?:Array<ISearch>
}

const MovieLists=({movieDatas}:Props)=> {
    return <main className={styles.MovieLists}>{movieDatas?.map((movie,idx)=>{
        const {Title,Year,Type,Poster} = movie
        const keySetting = `${Title}-${idx}`

        return (
          <article className={styles.movieWrap} key={keySetting}>
            {Poster==="N/A"? <div className={styles.imgNix}/> : <img className={styles.movieImg} src={Poster} alt={Title}/>}
            <dl className={styles.movieInfo}>
              <dt>{Title}</dt>
              <dd>{Year} / {Type}</dd>
            </dl>
          </article>
					)
    })}</main>
}

export default MovieLists