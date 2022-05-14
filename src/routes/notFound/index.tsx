import { NOT_FOUND } from 'assets/texts'
import styles from './NotFound.module.scss'

const NotFound = () => {
  return <strong className={styles.notFound}>{NOT_FOUND}</strong>
}

export default NotFound
