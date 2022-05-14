import { Dispatch, SetStateAction, memo } from 'react'
import { useSetRecoilState } from 'hooks/state'
import { modalState, IModalState } from 'states/modal'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import store from 'store'

import { Loading, Movie } from 'components'
import { IMovie } from 'types/movie'
import { NO_RESULTS } from '../../assets/texts'

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
const MovieLists = ({ movieDatas, setTarget, isNoResult, isLoading, setMovieLists, ActiveDnd }: Props) => {
  const setModalShow = useSetRecoilState<IModalState>(modalState)

  const handleClick = (movie: IMovie): void => setModalShow({ isShow: true, selectedMovie: movie })

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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='movieLists' isDropDisabled={!ActiveDnd}>
        {provided => (
          <section
            className={cx('movieLists', { emptyList: !movieDatas?.length })}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {movieDatas?.length || !isNoResult ? (
              movieDatas?.map((movie, idx) => {
                const { Title } = movie
                const key = `${Title}-${idx}`
                const dragKey = `drag-${Title}-${idx}`

                return <Movie key={key} dragKey={dragKey} handleClick={handleClick} idx={idx} movie={movie} />
              })
            ) : (
              <span className={cx('noResults')}>{NO_RESULTS}</span>
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
