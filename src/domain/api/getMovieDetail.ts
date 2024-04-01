const getMovieDetail = async ({
  movieId,
}: {
  movieId: number;
}): Promise<MovieDetailResult> => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;

  const queryParams = `language=ko-KR&api_key=${process.env.API_KEY}`;
  const movieDetailUrl = `${url}?${queryParams}`;

  const res = await fetch(movieDetailUrl);

  return await res.json();
};

export interface MovieDetailResult {
  id: number;
  title: string;
  genres: { id: number; name: string }[];
  overview: string;
  poster_path: string;
  vote_average: number;
}

export default getMovieDetail;
