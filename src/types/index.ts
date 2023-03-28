export type MovieListCategory = 'popular' | 'search';

export type UpdateMovieListEvent = CustomEvent<{ keyword: string }>;
export type AppendMovieListEvent = CustomEvent<{ keyword: string }>;
export type DetailMovieEvent = CustomEvent<{ movieId: string }>;
