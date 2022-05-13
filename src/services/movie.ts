import { axios } from 'hooks/worker'
import { IMovieAPIRes } from '../types/movie.d'

const MOVIE_BASE_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`

interface Params {
  searchWord: string
  pageNum: number
}

export const getMoviesApi = ({ searchWord, pageNum }: Params) =>
  axios.get<IMovieAPIRes>(`${MOVIE_BASE_URL}&s=${searchWord}&page=${pageNum}`)
