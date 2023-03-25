import { MovieDetailRoot, MovieRoot } from './movieApi';

export const isMovieRoot = (root: unknown): root is MovieRoot => {
  const value = root as MovieRoot;

  return 'page' in value && 'results' in value && 'total_pages' in value && 'total_results' in value;
};

export const isMovieDetailRoot = (root: unknown): root is MovieDetailRoot => {
  const value = root as MovieDetailRoot;

  return (
    'adult' in value &&
    'backdrop_path' in value &&
    'belongs_to_collection' in value &&
    'budget' in value &&
    'genres' in value &&
    'homepage' in value &&
    'id' in value &&
    'imdb_id' in value &&
    'original_language' in value &&
    'original_title' in value &&
    'overview' in value &&
    'popularity' in value &&
    'poster_path' in value &&
    'production_companies' in value &&
    'production_countries' in value &&
    'release_date' in value &&
    'revenue' in value &&
    'runtime' in value &&
    'spoken_languages' in value &&
    'status' in value &&
    'tagline' in value &&
    'title' in value &&
    'video' in value &&
    'vote_average' in value &&
    'vote_count' in value
  );
};
