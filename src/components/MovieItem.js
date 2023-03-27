class MovieItem {
  id;

  title;

  genre;

  poster_path;

  vote_average;

  constructor({ id, title, genre, poster_path, vote_average }) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.poster_path = poster_path;
    this.vote_average = vote_average;

    this.init();
  }
}

export default MovieItem;
