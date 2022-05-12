import { atom } from 'hooks/state'

export interface IParamsGetMoviesApiState {
  searchWord: string
  pageNum: number
}

export const paramsGetMoviesApiState = atom<IParamsGetMoviesApiState>({
  key: '#paramsGetMoviesApiState',
  default: { searchWord: '', pageNum: 1 },
})
