import { REQUEST_URL, COMMON_OPTIONS } from '../constants/requests';
import fetchData from '../utils/fetchData';
import { generateUrl } from '../utils/generateUrl';

interface MovieResults {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: boolean;
  budget: number;
  homepage: string;
  imdb_id: string;
  production_companies: [];
  production_countries: [];
  revenue: number;
  runtime: number;
  spoken_languages: [];
  status: string;
  tagline: string;
  genres: [];
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

const fetchMovies = async (url: string): Promise<Movie> => {
  const data = await fetchData({
    url,
    options: COMMON_OPTIONS,
  });

  const movie: Pick<
    MovieResults,
    'id' | 'title' | 'vote_average' | 'poster_path' | 'overview' | 'genres'
  > = {
    id: data.id,
    title: data.title,
    vote_average: data.vote_average,
    poster_path: data.poster_path,
    overview: data.overview,
    genres: data.genres,
  };

  return movie;
};

const MovieDetailService = {
  async fetchDetailMovie(id: number) {
    const url = generateUrl(`${REQUEST_URL.detailMovie}${id}?`);
    return fetchMovies(url);
  },
};

export default MovieDetailService;
