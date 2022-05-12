import { atom } from 'hooks/state'

export interface IModalState {
  isShow: boolean
  favId: string
}

export const modalState = atom<IModalState>({
  key: '#modalState',
  default: { isShow: false, favId: '' },
})
