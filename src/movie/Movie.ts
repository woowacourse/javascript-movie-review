class Movie implements IMovieItemData {
  poster_path: string;
  title: string;
  vote_average: number;

  constructor(data: IMovieItemData) {
    this.poster_path = data.poster_path;
    this.title = data.title;
    this.vote_average = data.vote_average;
  }
}

export default Movie;
