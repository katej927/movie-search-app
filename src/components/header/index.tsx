import { useState, ChangeEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState } from 'hooks/state'
import { paramsGetMoviesApiState } from 'states/movie'

import styles from './Header.module.scss'
import { cn } from 'styles'
import { BiSearch } from 'react-icons/bi'

const cx = cn.bind(styles)

const Header = () => {
  const [paramsGetMoviesApi, setParamsGetMoviesApi] = useRecoilState(paramsGetMoviesApiState)
  const [text, setText] = useState<string>('')

  const location = useLocation()
  console.log('location', location.pathname)

  const handleClick = () => {
    console.log('handleSubmit')
    setParamsGetMoviesApi({ searchWord: text, pageNum: 1 })
    setText('')
  }
  const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>): void => {
    setText(value)
  }

  console.log('paramsGetMoviesApi', paramsGetMoviesApi.searchWord, 'text', text)

  return (
    <header className={cx('header')}>
      {location.pathname === '/' ? (
        // <form className={cx('form')}> // 임시로 처리해둠
        <>
          <input
            className={cx('searchInput')}
            type='search'
            name='searchInput'
            placeholder='제목으로 입력'
            onChange={handleChange}
            value={text}
          />
          <button className={cx('btn')} type='submit' onClick={handleClick}>
            <BiSearch size={25} color='#666666' />
          </button>
        </>
      ) : (
        // </form>
        <h1>내 즐겨찾기</h1>
      )}
    </header>
  )
}

export default Header
