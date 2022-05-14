import { Dispatch, SetStateAction, CSSProperties } from 'react'
import { useSetRecoilState } from 'hooks/state'
import { modalState, IModalState } from 'states/modal'
import ReactLoading from 'react-loading'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import store from 'store'

import { cn } from 'styles'
import styles from './MovieLists.module.scss'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

import { IMovie } from 'types/movie'
import { NO_RESULTS } from '../../assets/texts'

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

  const handleDragEnd = (result: DropResult) => {
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

  const iconStyles: CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    color: '#ff3c79',
  }

  console.log('!movieDatas?.length', !movieDatas?.length)
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='movieLists' isDropDisabled={!ActiveDnd}>
        {provided => (
          <section
            className={cx('movieLists', { emptyList: !movieDatas?.length })}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {!isNoResult ? (
              movieDatas?.map((movie, idx) => {
                const { Title, Year, Type, Poster, fav } = movie
                const keySetting = `${Title}-${idx}`
                const dragKeySetting = `drag-${Title}-${idx}`

                return (
                  <Draggable key={dragKeySetting} draggableId={dragKeySetting} index={idx}>
                    {providedChild => (
                      <summary
                        className={cx('movieWrap')}
                        key={keySetting}
                        onClick={() => handleClick(movie)}
                        ref={providedChild.innerRef}
                        {...providedChild.dragHandleProps}
                        {...providedChild.draggableProps}
                      >
                        {Poster === 'N/A' ? (
                          <div className={cx('imgNix')} />
                        ) : (
                          <img className={cx('movieImg')} src={Poster} alt={Title} />
                        )}
                        <div className={cx('movieInfo')}>
                          {fav ? (
                            <AiFillStar style={iconStyles} size={20} />
                          ) : (
                            <AiOutlineStar style={iconStyles} size={20} />
                          )}
                          <div>
                            <h3 className={cx('title')}>{Title}</h3>
                            <time>
                              {Year} / {Type}
                            </time>
                          </div>
                        </div>
                      </summary>
                    )}
                  </Draggable>
                )
              })
            ) : (
              <span className={cx('noResults')}>{NO_RESULTS}</span>
            )}
            {!isNoResult && isLoading && (
              <div className={cx('loading')} ref={setTarget}>
                <ReactLoading type='spinningBubbles' height='45px' width='45px' />
              </div>
            )}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default MovieLists
