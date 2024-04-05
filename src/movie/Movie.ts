class Movie implements IMovieItemData {
  poster_path: string;
  title: string;
  id: number;
  vote_average: number;

  constructor(data: IMovieItemData) {
    this.poster_path = data.poster_path;
    this.id = data.id;
    this.title = data.title;
    this.vote_average = data.vote_average;
  }
}

export default Movie;
