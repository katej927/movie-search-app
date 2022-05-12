import styles from './Loading.module.scss'
import ReactLoading from 'react-loading'

const Loading = () => {
  return (
    <div className={styles.Loading}>
      <ReactLoading type='spinningBubbles' />
    </div>
  )
}

export default Loading
