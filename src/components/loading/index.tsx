import ReactLoading from 'react-loading'

import styles from './Loading.module.scss'
import cn from 'classnames/bind'

const cx = cn.bind(styles)

const Loading = () => {
  return (
    <div className={cx('loading')}>
      <ReactLoading type='spinningBubbles' />
    </div>
  )
}

export default Loading
