import { atom } from 'hooks/state'
import { IMovie } from 'types/movie'

export interface IModalState {
  isShow: boolean
  selectedMovie: IMovie
}

export const modalState = atom<IModalState>({
  key: '#modalState',
  default: {
    isShow: false,
    selectedMovie: {
      Title: '',
      Year: '',
      imdbID: '',
      Type: '',
      Poster: '',
      fav: false,
    },
  },
})
