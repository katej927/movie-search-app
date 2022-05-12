import { atom } from 'hooks/state'

export interface IModalState {
  isShow: boolean
  isInFavs: boolean
}

export const modalState = atom<IModalState>({
  key: '#modalState',
  default: { isShow: false, isInFavs: false },
})
