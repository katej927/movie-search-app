import { atom } from 'hooks/state'
import { IMovie } from 'types/movie'

export interface IParamsGetMoviesApiState {
  searchWord: string
  pageNum: number
}

export const paramsGetMoviesApiState = atom<IParamsGetMoviesApiState>({
  key: '#paramsGetMoviesApiState',
  default: { searchWord: '', pageNum: 1 },
})

export const moviesInSearchState = atom<IMovie[]>({
  key: '#moviesInSearchState',
  default: [],
})
