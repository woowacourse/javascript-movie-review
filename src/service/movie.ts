const API_TOKEN = process.env.API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

interface Popular {
  page: number;
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: 'ko';
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const request = (uri: string) => {
  return fetch(`${BASE_URL}${uri}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
};

const getPopularMovies = async ({ page }: Popular): Promise<Movie[]> => {
  const query = `page=${page}&region=KR&language=ko-KR`;
  const response = await request(`/movie/popular?${query}`);
  const movies = await response.json();

  return movies;
};

const searchMovies = async ({ text, page }: { text: string; page: number }) => {
  const query = `query=${text}&page=${page}&language=ko-KR&region=KR`;
  const response = await request(`/search/movie?${query}`);
  const movies = await response.json();

  return movies;
};

export { getPopularMovies, searchMovies };
