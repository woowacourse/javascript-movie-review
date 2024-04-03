import { IMovie, TGenre } from '../types/movie';

class Movie implements IMovie {
  id: number;
  title: string;
  imageSrc: string;
  score: number;
  genre: TGenre[];
  description: string;
  constructor({ id, title, imageSrc, score, genre, description }: IMovie) {
    this.id = id;
    this.title = title;
    this.imageSrc = imageSrc;
    this.score = score;
    this.genre = genre;
    this.description = description;
  }

  equal(movie: IMovie) {
    return movie.id === this.id;
  }

  get(): IMovie {
    return {
      id: this.id,
      title: this.title,
      imageSrc: this.imageSrc,
      score: this.score,
      genre: this.genre,
      description: this.description,
    };
  }
}

export default Movie;
