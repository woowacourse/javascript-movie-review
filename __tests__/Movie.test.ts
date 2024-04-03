import Movie from '../src/domains/Movie';
import { IMovie } from '../src/types/movie';

describe('Movie 테스트', () => {
  const MOVIE1: IMovie = {
    id: 1,
    title: '제목',
    imageSrc: 'http://www.abc.com/a.jpg',
    score: 4,
    genre: ['Action'],
    description: '설명',
  };
  const MOVIE2: IMovie = {
    id: 1,
    title: '영화2',
    imageSrc: 'http://www.abc.com/b.jpg',
    score: 8,
    genre: ['Action'],
    description: '설명',
  };
  it('Movie 객체를 만든 후, get() 했을 때 동일한 객체를 얻는다.', () => {
    expect(new Movie(MOVIE1).get()).toEqual(MOVIE1);
  });

  it('id가 같은 Movie 객체를 비교했을 때, true를 반환한다.', () => {
    expect(new Movie(MOVIE1).equal(MOVIE2)).toBe(true);
  });
});
