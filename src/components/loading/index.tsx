import { memo } from 'hooks'
import ReactLoading from 'react-loading'

import styles from './Loading.module.scss'
import cn from 'classnames/bind'

const cx = cn.bind(styles)

interface Props {
  height?: string
  width?: string
}

const Loading = ({ height, width }: Props) => {
  return (
    <div className={cx('loading')}>
      <ReactLoading type='spinningBubbles' height={height} width={width} />
    </div>
  )
}

export default memo(Loading)
