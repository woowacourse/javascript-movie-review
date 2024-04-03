import { IMovie, TGenre } from '../types/movie';

class Movie implements IMovie {
  id: number;
  title: string;
  imageSrc: string;
  score: number;
  genre: TGenre[];
  description: string;
  myScore: number;
  constructor({
    id,
    title = '영화제목',
    imageSrc = '이미지주소',
    score = 0,
    genre = ['Action'],
    description = '빈 설명',
    myScore = 0,
  }: IMovie) {
    this.id = id;
    this.title = title;
    this.imageSrc = imageSrc;
    this.score = score;
    this.genre = genre;
    this.description = description;
    this.myScore = myScore;
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

  getMyScoreInfo() {
    return { id: this.id, myScore: this.myScore };
  }
}

export default Movie;
