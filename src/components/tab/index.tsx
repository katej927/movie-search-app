import cx from 'classnames'
import styles from './Tab.module.scss'
import { NavLink } from 'react-router-dom'
import { TABS } from './TabInfos'

const Tab = () => {
  return (
    <nav className={styles.tab}>
      <ul>
        {TABS.map(tab => {
          const { title, icon, to } = tab
          return (
            <li key={title}>
              <NavLink to={to} className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
                {icon}
                {title}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
export default Tab
