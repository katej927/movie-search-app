import { memo } from 'hooks'
import { NavLink } from 'react-router-dom'

import { TABS } from './TabInfos'

import cn from 'classnames'
import styles from './Tab.module.scss'

const cx = cn.bind(styles)

const Tab = () => {
  return (
    <nav className={styles.tab}>
      <ul>
        {TABS.map((tab, idx) => {
          const { icon, to } = tab
          const keySetting = `icon-${idx}`
          return (
            <li key={keySetting} className={cx('eachTab')}>
              <NavLink to={to} className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
                {icon}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
export default memo(Tab)
