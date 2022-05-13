import { useState, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'hooks/state'
import { paramsGetMoviesApiState } from 'states/movie'

import styles from './Header.module.scss'
import { cn } from 'styles'
import { BiSearch } from 'react-icons/bi'

const cx = cn.bind(styles)

const Header = () => {
  const [paramsGetMoviesApi, setParamsGetMoviesApi] = useRecoilState(paramsGetMoviesApiState)
  const [text, setText] = useState<string>('')

  const params = useParams()

  // const handleSubmit = (event: any) => {

  //   // console.log('handleSubmit')
  //   // setParamsGetMoviesApi({ searchWord: text, pageNum: 1 })
  //   // setText('')
  // }

  const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>): void => {
    setText(value)
  }
  return (
    <header className={cx('header')}>
      <form className={cx('form')}>
        <input type='text' style={{ display: 'none' }} />
        <input
          className={cx('searchInput')}
          type='search'
          name='searchInput'
          placeholder='제목으로 입력'
          onChange={handleChange}
          value={text}
        />
        <button className={cx('btn')} type='submit'>
          <BiSearch size={25} color='#666666' />
        </button>
      </form>
    </header>
  )
}

export default Header
