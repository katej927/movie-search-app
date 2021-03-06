import { CSSProperties, memo } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

import { IMovie } from 'types/movie'

import styles from './Movie.module.scss'
import cn from 'classnames'

const cx = cn.bind(styles)

interface Props {
  handleClick: (movie: IMovie) => void
  index: number
  movie: IMovie
  ActiveDnd: boolean
}

const iconStyles: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  color: '#ff3c79',
}

const Movie = ({ handleClick, index, movie, ActiveDnd }: Props) => {
  const { Poster, Title, fav, Year, Type } = movie
  const dragKey = `${Title}-${index}`

  return (
    <Draggable draggableId={dragKey} index={index} isDragDisabled={!ActiveDnd}>
      {providedChild => (
        <summary
          className={cx(styles.movieWrap)}
          onClick={() => handleClick(movie)}
          ref={providedChild.innerRef}
          {...providedChild.dragHandleProps}
          {...providedChild.draggableProps}
        >
          {Poster === 'N/A' ? (
            <div className={cx(styles.imgNix)} />
          ) : (
            <img className={cx(styles.movieImg)} src={Poster} alt={Title} />
          )}
          <div className={cx(styles.movieInfo)}>
            {fav ? <AiFillStar style={iconStyles} size={20} /> : <AiOutlineStar style={iconStyles} size={20} />}
            <div>
              <h3 className={cx(styles.title)}>{Title}</h3>
              <time>
                {Year} / {Type}
              </time>
            </div>
          </div>
        </summary>
      )}
    </Draggable>
  )
}

export default memo(Movie, (prevProps, nextProps) => prevProps.movie === nextProps.movie)
