import { ApiMovieProps } from './../types/type';

export const $ = (selector: string) => document.querySelector(selector);

export const BASE_URL = 'https://api.themoviedb.org/3/';

export const request = async (searchWord: string, indexPage: number): Promise<Response> => {
  const response = await fetch(checkURL(searchWord, indexPage));

  if (!response.ok) {
    throw new Error('불러올 수 없습니다.');
  }

  return response;
};

export const checkURL = (word: string, pageIndex: number) => {
  return word === ''
    ? `${BASE_URL}movie/popular?api_key=${process.env.API_KEY}&language=ko&page=${pageIndex}`
    : `${BASE_URL}search/movie?api_key=${process.env.API_KEY}&language=ko&page=${pageIndex}&query=${word}`;
};

export const parsedFechedMovies = (fetchedMovies: ApiMovieProps[]) => {
  try {
    return fetchedMovies.map(movie => {
      return {
        id: movie.id,
        title: movie.title,
        imgUrl: movie.poster_path,
        score: movie.vote_average,
        description: movie.overview,
        genre: movie.genre_ids,
      };
    });
  } catch {
    throw new Error('데이터 구조가 변경되었습니다!');
  }
};

export const setMyScore = (id: string, score: string) => {
  if (window.localStorage.getItem(id) === null) {
    return window.localStorage.setItem(id, score);
  }

  window.localStorage.setItem(id, score);
};

export const getMyScore = (id: string) => {
  return window.localStorage.getItem(id);
};
