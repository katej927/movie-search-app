import styles from './Routes.module.scss'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import TodoList from './TodoList'
import Weather from './Weathers'
import Tab from 'components/tab'
import SearchMovie from './searchMovie'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <main className={styles.app}>
        <Helmet>
          <title>Movie Search App</title>
        </Helmet>
        <Tab />
        <Routes>
          {/* 수정 */}
          <Route path='/todoList' element={<TodoList />} />
          <Route path='todo' element={<TodoList />} />
          <Route path='weather' element={<Weather />}>
            <Route path=':city' element={<Weather />} />
          </Route>
          <Route path='/' element={<SearchMovie />} />
        </Routes>
        <Tab />
      </main>
    </div>
  )
}

export default App
