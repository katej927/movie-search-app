import { axios } from 'hooks/worker'
import { IMovieAPIRes } from '../types/movie.d'

const MOVIE_BASE_URL = 'http://www.omdbapi.com/?apikey='

interface Params {
  searchWord: string
  pageNum: number
}

export const getMoviesApi = ({ searchWord, pageNum }: Params) =>
  axios.get<IMovieAPIRes>(`${MOVIE_BASE_URL}${process.env.REACT_APP_API_KEY}&s=${searchWord}&page=${pageNum}`)
