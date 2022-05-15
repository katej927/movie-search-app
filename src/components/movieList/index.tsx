import { Dispatch, SetStateAction, memo, useCallback, CSSProperties } from 'react'
import { useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'hooks/state'
import { modalState, IModalState } from 'states/modal'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { List } from 'react-virtualized'
import store from 'store'

import { Loading, Movie } from 'components'
import { IMovie } from 'types/movie'
import { NO_RESULTS, NO_FAVS } from '../../assets/texts'

import { cn } from 'styles'
import styles from './MovieList.module.scss'

const cx = cn.bind(styles)

interface Props {
  isLoading?: boolean
  isNoResult?: boolean
  movieDatas: IMovie[]
  setTarget?: Dispatch<SetStateAction<HTMLElement | null | undefined>>
  setMovieLists?: Dispatch<SetStateAction<IMovie[]>>
  ActiveDnd: boolean
}

interface IRowRender {
  key: string
  index: number
  style: CSSProperties
}

const MovieLists = ({ movieDatas, setTarget, isNoResult, isLoading, setMovieLists, ActiveDnd }: Props) => {
  const setModalShow = useSetRecoilState<IModalState>(modalState)
  const location = useLocation()

  const handleClick = useCallback(
    (movie: IMovie) => setModalShow({ isShow: true, selectedMovie: movie }),
    [setModalShow]
  )

  const handleDragEnd = (result: DropResult): void => {
    if (!result.destination) return
    const {
      destination: { index: destIdx },
      source: { index: srcIdx },
    } = result

    const getPrevFavs: IMovie[] = store.get('favs')
    const [grapedItem] = getPrevFavs.splice(srcIdx, 1)
    getPrevFavs.splice(destIdx, 0, grapedItem)
    store.set('favs', getPrevFavs)
    setMovieLists && setMovieLists(getPrevFavs)
  }

  const rowRenderer = useCallback(
    ({ key, index }: IRowRender) => {
      const movie = movieDatas[index]
      return <Movie index={index} movie={movie} key={key} handleClick={handleClick} ActiveDnd={ActiveDnd} />
    },
    [movieDatas, handleClick]
  )

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='movieLists' isDropDisabled={!ActiveDnd}>
        {provided => (
          <section
            className={cx('movieLists', { emptyList: !movieDatas?.length })}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {movieDatas?.length ? (
              <List
                className={styles.movieList}
                width={320}
                height={170 * movieDatas.length}
                rowCount={movieDatas.length}
                rowHeight={170}
                rowRenderer={rowRenderer}
                list={movieDatas}
              />
            ) : (
              <span className={cx('noResults')}>{location.pathname === '/' ? NO_RESULTS : NO_FAVS}</span>
            )}
            {!isNoResult && isLoading && (
              <div className={cx('loading')} ref={setTarget}>
                <Loading height='45px' width='45px' />
              </div>
            )}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default memo(MovieLists)
