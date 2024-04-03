import MovieCollection from '../src/domains/MovieCollection';
import { IMovie } from '../src/types/movie';
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

    expect(movieCollection.get()).toEqual([MOVIE1]);
  });

  it('영화 하나를 제거했을 때, 제거된 영화가 얻어진다.', () => {
    const movieCollection = new MovieCollection([MOVIE1, MOVIE2]);

    movieCollection.remove(MOVIE1);

    expect(movieCollection.get()).toEqual([MOVIE2]);
  });

  it('영화 하나를 업데이트 했을 때, 해당 영화가 업데이트되어 얻어진다.', () => {
    const movieCollection = new MovieCollection([MOVIE1, MOVIE2]);
    const UPDATED_MOVIE1: IMovie = {
      ...MOVIE1,
      title: '영화1_제목_업데이트',
    };

    movieCollection.update(UPDATED_MOVIE1);

    expect(movieCollection.get()).toEqual([UPDATED_MOVIE1, MOVIE2]);
  });

  it('영화 목록에서 영화 하나만을 필터링한다.', () => {
    const movieCollection = new MovieCollection([MOVIE1, MOVIE2]);

    expect(movieCollection.getFiltered(MOVIE1)).toEqual([MOVIE1]);
  });

  it('영화 목록에서 별점 정보만을 반환한다.', () => {
    const movieCollection = new MovieCollection([MOVIE1, MOVIE2]);

    expect(movieCollection.getScoresInfo()).toEqual([
      { id: 1, score: 4 },
      { id: 2, score: 8 },
    ]);
  });
});
