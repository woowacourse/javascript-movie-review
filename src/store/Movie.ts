import MovieDetails from "../types/MovieDetails";
import imageUrl from "../utils/imageUrl";

export default class Movie {
  constructor(
    public id: number,
    public title: string,
    public posterUrl: string,
    public voteAverage: number,
    public rating: number,
    public releaseDate: string,
    public genres: string[],
    public overview: string
  ) {}

  static fromTMDB(data: MovieDetails): Movie {
    return new Movie(
      data.id,
      data.title,
      imageUrl(data.poster_path),
      data.vote_average,
      0,
      data.release_date,
      data.genres.map((g) => g.name),
      data.overview
    );
  }
}
