import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import styles from './Layout.module.scss'

import { Tab, Header, Modal } from 'components'
import { modalState, IModalState } from 'states/modal'
import { useRecoilValue } from 'hooks/state'

const Layout = () => {
  const { isShow } = useRecoilValue<IModalState>(modalState)

  return (
    <div className={styles.appWrapper}>
      <Helmet>
        <title>Movie Search App</title>
        <meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' />
      </Helmet>
      <main className={styles.app}>
        {isShow && <Modal />}
        <Header />
        <Outlet />
        <Tab />
      </main>
    </div>
  )
}

export default Layout
