import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'
import TodoList from './TodoList'
import Weather from './Weathers'
import GNB from 'routes/_shared/GNB'
import SearchMovie from './SearchMovie'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.app}>
        <GNB />
        <Routes>
          {/* 수정 */}
          <Route path='/todoList' element={<TodoList />} />
          <Route path='todo' element={<TodoList />} />
          <Route path='weather' element={<Weather />}>
            <Route path=':city' element={<Weather />} />
          </Route>
          <Route path='/' element={<SearchMovie/>} />
        </Routes>
        <GNB />
      </div>
    </div>
  )
}

export default App
