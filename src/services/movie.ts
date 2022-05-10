import { axios } from 'hooks/worker'
import { IMovieAPIRes } from '../types/movie.d'

const MOVIE_BASE_URL = 'http://www.omdbapi.com/?apikey=92e32667&s=iron%20man&page=5'

export const getMoviesApi = () => axios.get<IMovieAPIRes>(MOVIE_BASE_URL)
