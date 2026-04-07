import { Movie } from '../view/movieListView'

export class HttpError extends Error {}
export class NetWorkError extends Error {}

const BASE_URL = 'https://api.themoviedb.org/3'
const POPULAR_PATH = '/movie/popular'
const SEARCH_PATH = '/search/movie'

const request = async <T>(path: string, params: Record<string, string>): Promise<T> => {
    const searchParams = new URLSearchParams({
        api_key: import.meta.env.VITE_API_KEY,
        language: 'ko-KR',
        ...params,
    })

    try {
        const response = await fetch(`${BASE_URL}${path}?${searchParams}`)
        if (!response.ok) throw new HttpError('데이터를 불러오지 못했습니다.')
        const data = await response.json()
        return data
    } catch (e) {
        if (e instanceof HttpError) throw e
        throw new NetWorkError('네트워크 오류가 발생했습니다.')
    }
}

export const fetchDefaultMovieList = (pageNum: number): Promise<Movie[]> =>
    request<{ results: Movie[] }>(POPULAR_PATH, { page: String(pageNum) }).then((n) => n.results)

export const fetchSearchMovieList = (pageNum: number, searchBarText: string): Promise<Movie[]> =>
    request<{ results: Movie[] }>(SEARCH_PATH, {
        page: String(pageNum),
        query: encodeURIComponent(searchBarText),
    }).then((n) => n.results)

export const fetchMovieDetail = (id: number): Promise<Movie> => request<Movie>(`/movie/${id}`, {})
