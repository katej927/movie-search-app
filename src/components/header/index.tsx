import { useState, ChangeEvent, FormEvent, memo } from 'react'
import { useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'hooks/state'
import { paramsGetMoviesApiState, IParamsGetMoviesApiState } from 'states/movie'

import { BiSearch } from 'react-icons/bi'

import styles from './Header.module.scss'
import { cn } from 'styles'

const cx = cn.bind(styles)

const Header = () => {
  const setParamsGetMoviesApi = useSetRecoilState<IParamsGetMoviesApiState>(paramsGetMoviesApiState)

  const [text, setText] = useState<string>('')

  const location = useLocation()

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setParamsGetMoviesApi({ searchWord: text, pageNum: 1 })
    setText('')
  }
  const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>): void => {
    setText(value)
  }

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

export default memo(Header)
