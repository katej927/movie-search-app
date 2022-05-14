import { Routes, Route } from 'react-router-dom'
import loadable from '@loadable/component'

import Layout from './layout'
import { Loading } from 'components'

const Search = loadable(() => import('./search'))
const Favs = loadable(() => import('./favs'))
const NotFound = loadable(() => import('./notFound'))

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Search fallback={<Loading />} />} />
        <Route path='favs' element={<Favs fallback={<Loading />} />} />
        <Route path='*' element={<NotFound fallback={<Loading />} />} />
      </Route>
    </Routes>
  )
}

export default App
