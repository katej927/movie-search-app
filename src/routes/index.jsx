import { Routes, Route } from 'react-router-dom'

import TodoList from './TodoList'
import Weather from './Weathers'
import Search from './search'
import Layout from './layout'
import NotFound from './notFound'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Search />} />
        <Route path='*' element={<NotFound />} />

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
