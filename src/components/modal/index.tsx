import { useClickAway, useRef } from 'hooks'
import { useRecoilState } from 'hooks/state'
import { modalState, IModalState } from 'states/modal'
import { addOrRemoveBtnText } from 'assets/texts'

import styles from './Modal.module.scss'
import { cn } from 'styles'

const cx = cn.bind(styles)

const Modal = () => {
  const [modalShow, setModalShow] = useRecoilState<IModalState>(modalState)
  const { isShow, isInFavs } = modalShow
  const btnText = addOrRemoveBtnText(isInFavs)

  const ref = useRef(null)

  useClickAway(ref, () => {
    setModalShow(prev => ({ ...prev, isShow: false }))
  })

  const handleHideModalClick = (): void => setModalShow(prev => ({ ...prev, isShow: false }))

  return (
    <div className={cx('overlay', { hide: !isShow })}>
      <section className={styles.content} ref={ref}>
        <button type='button'>{btnText}</button>
        <button type='button' onClick={handleHideModalClick}>
          취소
        </button>
      </section>
    </div>
  )
}

export default Modal
