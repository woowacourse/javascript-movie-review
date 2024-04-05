class MovieDetails implements IMovieDetailsData {
  poster_path: string;
  title: string;
  vote_average: number;
  genres: object[];
  overview: string;

  constructor(data: IMovieDetailsData) {
    this.poster_path = data.poster_path;
    this.title = data.title;
    this.vote_average = data.vote_average;
    this.genres = data.genres;
    this.overview = data.overview;
  }
}

export default MovieDetails;
