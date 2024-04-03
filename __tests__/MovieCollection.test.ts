import Movie from '../src/domains/Movie';
import { IMovie } from '../src/types/movie';

class MovieCollection {
  private movies: IMovie[] = [];
  constructor(movies: IMovie[] = []) {
    this.movies = movies;
  }
  add(movie: IMovie) {
    this.movies.push(movie);
  }
  getMovies() {
    return this.movies;
  }

  remove(movie: IMovie) {
    this.movies = this.movies.filter(m => !new Movie(m).equal(movie));
  }
}
describe('MovieCollection 테스트', () => {
  const MOVIE1: IMovie = {
    id: 1,
    title: '제목',
    imageSrc: 'http://www.abc.com/a.jpg',
    score: 4,
    genre: ['Action'],
    description: '설명',
  };
  const MOVIE2: IMovie = {
    id: 2,
    title: '영화2',
    imageSrc: 'http://www.abc.com/b.jpg',
    score: 8,
    genre: ['Action'],
    description: '설명',
  };
  it('영화 하나를 추가했을 때, 추가한 영화 하나가 불러와진다.', () => {
    const movieCollection = new MovieCollection();
    movieCollection.add(MOVIE1);

    expect(movieCollection.getMovies()).toEqual([MOVIE1]);
  });

  it('영화 하나를 제거했을 때, 제거된 영화가 얻어진다.', () => {
    const movieCollection = new MovieCollection([MOVIE1, MOVIE2]);

    movieCollection.remove(MOVIE1);

    expect(movieCollection.getMovies()).toEqual([MOVIE2]);
  });
});
