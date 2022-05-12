import { Routes, Route } from 'react-router-dom'
import loadable from '@loadable/component'

import TodoList from './TodoList'
import Weather from './Weathers'
import Layout from './layout'
import Loading from 'components/loading'

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

        {/* 수정 */}
        <Route path='/todoList' element={<TodoList />} />
        <Route path='todo' element={<TodoList />} />
        <Route path='weather' element={<Weather />}>
          <Route path=':city' element={<Weather />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
