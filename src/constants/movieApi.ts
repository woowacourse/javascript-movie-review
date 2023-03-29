export const requestUrl = Object.freeze({
  getPopularMovie: (page: number) => {
    return `https://ornate-swan-ce5a5e.netlify.app/tmdb/movie/popular?language=ko-KR&page=${page}`;
  },
  getSearchMovie: (query: FormDataEntryValue, page: number) => {
    return `https://ornate-swan-ce5a5e.netlify.app/tmdb/search/movie?language=ko-KR&query=${query}&page=${page}`;
  },
  getMovieDetail: (id: string) => {
    return `https://ornate-swan-ce5a5e.netlify.app/tmdb/movie/${id}?language=ko-KR`;
  },
});

export const movieRootKeys = Object.freeze(['page', 'results', 'total_pages', 'total_results']);

export const movieDetailRootKeys = Object.freeze([
  'adult',
  'backdrop_path',
  'belongs_to_collection',
  'budget',
  'genres',
  'homepage',
  'id',
  'imdb_id',
  'original_language',
  'original_title',
  'overview',
  'popularity',
  'poster_path',
  'production_companies',
  'production_countries',
  'release_date',
  'revenue',
  'runtime',
  'spoken_languages',
  'status',
  'tagline',
  'title',
  'video',
  'vote_average',
  'vote_count',
]);
