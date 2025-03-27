/// <reference types="vite/client" />
import { IMovieData } from '../../types/movieDataType'
import { BASE_URL } from './constant'
export interface TMDBResponse {
  page: number
  results: IMovieData[]
  total_pages: number
  total_results: number
}

export async function fetchPopularMovies(pageIndex: number) {
  const popularMovieUrl = `${BASE_URL}/movie/popular?language=ko-Kr&page=${pageIndex}`
  return await fetchUtil(popularMovieUrl)
}

export async function fetchSearchMovies(pageIndex: number, searchKeyword: string) {
  const searchMovieUrl = `${BASE_URL}/search/movie?query=${searchKeyword}&include_adult=false&language=en-US&page=${pageIndex}`
  return await fetchUtil(searchMovieUrl)
}

async function fetchUtil(url: string) {
  const options = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    alert('서버와의 연결이 끊어졌습니다')
    return
  }

  const { results, total_pages } = (await response.json()) as TMDBResponse
  return { results, total_pages }
}
