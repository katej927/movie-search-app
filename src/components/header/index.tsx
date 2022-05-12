import { useState, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'

import { BiSearch } from 'react-icons/bi'

import styles from './Header.module.scss'

const Header = () => {
  const [text, setText] = useState<string>('')

  const params = useParams()

  const handleChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setText(value)
  }

  console.log('params', params, 'text', text)

  return (
    <header className={styles.header}>
      <form className={styles.form}>
        <input
          className={styles.searchInput}
          type='search'
          name='searchInput'
          placeholder='제목으로 입력'
          onChange={handleChange}
          value={text}
        />
        <button className={styles.btn} type='submit'>
          <BiSearch size={25} color='#666666' />
        </button>
      </form>
    </header>
  )
}

export default Header
