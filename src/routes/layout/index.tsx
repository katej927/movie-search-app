import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import styles from './Layout.module.scss'

import Tab from 'components/tab'
import Header from 'components/header/Header'

const Layout = () => {
  return (
    <div className={styles.appWrapper}>
      <Helmet>
        <title>Movie Search App</title>
      </Helmet>
      <main className={styles.app}>
        <Header />
        <Outlet />
        <Tab />
      </main>
    </div>
  )
}

export default Layout
