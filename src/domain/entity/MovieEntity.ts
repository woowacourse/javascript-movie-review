import { Movie } from '@/types/movie';

class MovieEntity implements Movie {
  title;
  posterPath;
  voteAverage;

  constructor({ title, posterPath, voteAverage }: Movie) {
    this.title = title;
    this.posterPath = posterPath;
    this.voteAverage = voteAverage;
  }

  get() {
    return {
      title: this.title,
      posterPath: this.posterPath,
      voteAverage: this.voteAverage,
    };
  }
}

export default MovieEntity;
