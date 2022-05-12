import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import styles from './Layout.module.scss'

import Tab from 'components/tab'
import Header from 'components/header'
import Modal from 'components/modal'

const Layout = () => {
  return (
    <div className={styles.appWrapper}>
      <Helmet>
        <title>Movie Search App</title>
      </Helmet>
      <main className={styles.app}>
        <Modal />
        <Header />
        <Outlet />
        <Tab />
      </main>
    </div>
  )
}

export default Layout
