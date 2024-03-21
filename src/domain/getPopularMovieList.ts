export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
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

interface Response {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

const getPopularMovieList = async ({
  page,
}: {
  page: number;
}): Promise<Response> => {
  const options = { method: "GET", headers: { accept: "application/json" } };

  const url = "https://api.themoviedb.org/3/movie/popular";
  const queryParams = `language=ko-KR&page=${page}&api_key=${process.env.API_KEY}`;
  const popularMoviesUrl = `${url}?${queryParams}`;

  const res = await fetch(popularMoviesUrl);
  const popularMovieList = await res.json();

  return popularMovieList;
};

export default getPopularMovieList;
