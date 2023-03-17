import { POPULAR_MOVIE_DATA, POPULAR_MOVIE_MAPPED_DATA } from './__mocks__/popularMovieData';
import { SEARCHED_MOVIE_DATA, SEARCHED_MOVIE_MAPPED_DATA } from './__mocks__/searchedMovieData';
import { HTTP_STATUS_INTERNAL_SERVER_ERROR } from '../src/constants';
import MovieList from '../src/domain/MovieList';
import { fetchPopularMovieData, fetchSearchedMovieData } from '../src/api/movieAPI';
import HTTPError from '../src/api/HTTPError';

jest.mock('../src/api/movieAPI');

describe('MovieList 클래스 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('지금 인기 있은 영화 목록 데이터를 받아온 후 필요한 정보들만 담긴 객체들이 있는 배열을 반환한다.', async () => {
    fetchPopularMovieData.mockResolvedValueOnce(POPULAR_MOVIE_DATA.PAGE1);

    const { movies, searchQuery } = await MovieList.getMovieData();

    expect(movies).toEqual(POPULAR_MOVIE_MAPPED_DATA.PAGE1);
    expect(searchQuery).toBe('');
    expect(fetchPopularMovieData).toHaveBeenCalledWith(1);
  });

  test('데이터 재요청 시 지금 인기 있은 영화 목록 다음 페이지의 데이터를 반환한다.', async () => {
    fetchPopularMovieData.mockResolvedValueOnce(POPULAR_MOVIE_DATA.PAGE2);

    const { movies, searchQuery } = await MovieList.getMovieData();

    expect(movies).toEqual(POPULAR_MOVIE_MAPPED_DATA.PAGE2);
    expect(searchQuery).toBe('');
    expect(fetchPopularMovieData).toHaveBeenCalledWith(2);
  });

  test('검색어가 있을 경우 검색어에 대한 첫 번째 페이지의 데이터 요청 후 반환한다.', async () => {
    fetchSearchedMovieData.mockResolvedValueOnce(SEARCHED_MOVIE_DATA.PAGE1);

    MovieList.init('외계인');

    const { movies, searchQuery } = await MovieList.getMovieData();

    expect(movies).toEqual(SEARCHED_MOVIE_MAPPED_DATA.PAGE1);
    expect(searchQuery).toBe('외계인');
    expect(fetchSearchedMovieData).toHaveBeenCalledWith('외계인', 1);
  });

  test('검색어가 있을 때 데이터 재요청 시 검색어의 다음 페이지의 데이터를 반환한다.', async () => {
    fetchSearchedMovieData.mockResolvedValueOnce(SEARCHED_MOVIE_DATA.PAGE2);

    const { movies, searchQuery } = await MovieList.getMovieData();

    expect(movies).toEqual(SEARCHED_MOVIE_MAPPED_DATA.PAGE2);
    expect(searchQuery).toBe('외계인');
    expect(fetchSearchedMovieData).toHaveBeenCalledWith('외계인', 2);
  });

  test('데이터를 가져오는 과정에서 문제가 있을 시 에러가 발생한다.', async () => {
    fetchPopularMovieData.mockRejectedValueOnce(new HTTPError(HTTP_STATUS_INTERNAL_SERVER_ERROR));

    await expect(MovieList.getMovieData()).rejects.toThrow();
  });
});
