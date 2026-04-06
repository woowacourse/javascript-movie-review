import { Movie } from '../view/movieListView'

export class HttpError extends Error {}
export class NetWorkError extends Error {}

const BASE_API = {
    baseURL: 'https://api.themoviedb.org/3',
    api_key: import.meta.env.VITE_API_KEY,
    language: 'ko-KR',
}

export const fetchMovieList = async (URL: string) => {
    try {
        const response = await fetch(URL)
        if (!response.ok) {
            throw new HttpError('데이터를 불러오지 못했습니다.')
        }
        const data = await response.json()
        return data.results
    } catch (e) {
        if (e instanceof HttpError) throw e
        throw new NetWorkError('네트워크 오류가 발생했습니다.')
    }
}

export const fetchDefaultMovieList = async (pageNum: number): Promise<Movie[]> => {
    const URL = `${BASE_API.baseURL}/movie/popular?api_key=${BASE_API.api_key}&language=${BASE_API.language}&page=${pageNum}`
    return fetchMovieList(URL)
}

export const fetchSearchMovieList = async (pageNum: number, searchBarText: string): Promise<Movie[]> => {
    const URL = `${BASE_API.baseURL}/search/movie?api_key=${BASE_API.api_key}&query=${encodeURIComponent(searchBarText)}&language=${BASE_API.language}=${pageNum}`
    return fetchMovieList(URL)
}
