export interface MovieDTO {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
}

export default class Movie {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;

  constructor(movieData: MovieDTO) {
    this.id = movieData.id;
    this.title = movieData.title;
    this.posterPath = movieData.posterPath;
    this.voteAverage = movieData.voteAverage;
  }

  getPosterUrl(): string {
    return `https://image.tmdb.org/t/p/w500/${this.posterPath}`;
  }

  getVoteAverage(): string {
    return this.voteAverage.toFixed(1);
  }
}


