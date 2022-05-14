import { useState, ChangeEvent, FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
// import { useSetRecoilState } from 'hooks/state'
import { useRecoilState } from 'hooks/state'
import { paramsGetMoviesApiState } from 'states/movie'

import styles from './Header.module.scss'
import { cn } from 'styles'
import { BiSearch } from 'react-icons/bi'

const cx = cn.bind(styles)

const Header = () => {
  const [paramsGetMoviesApi, setParamsGetMoviesApi] = useRecoilState(paramsGetMoviesApiState)

  // const setParamsGetMoviesApi = useSetRecoilState(paramsGetMoviesApiState)
  const [text, setText] = useState<string>('')

  const location = useLocation()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setParamsGetMoviesApi({ searchWord: text, pageNum: 1 })
    setText('')
  }
  const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>): void => {
    setText(value)
  }

  console.log('location', location)
  return (
    <header className={cx('header')}>
      {location.pathname === '/' ? (
        <form className={cx('form')} onSubmit={handleSubmit}>
          <input
            className={cx('searchInput')}
            type='search'
            name='searchInput'
            placeholder='제목으로 입력'
            onChange={handleChange}
            value={text}
            autoComplete='off'
          />
          <button className={cx('btn')} type='submit'>
            <BiSearch size={25} color='#fff' />
          </button>
        </form>
      ) : (
        <h1 className={cx('title')}>My Favorites</h1>
      )}
    </header>
  )
}

export default Header
