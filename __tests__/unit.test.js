import Movie from '../src/domain/Movie.ts';
import convertToPosterUrl from '../src/util/convertToPosterUrl.js';

describe('영화 객체 테스트', () => {
  it('영화 데이터를 주입하면 올바르게 반환한다.', () => {
    const movieData = {
      id: 1011985,
      posterPath: '/1ZNOOMmILNUzVYbzG1j7GYb5bEV.jpg',
      title: '쿵푸팬더 4',
      voteAverage: 6.913,
    };

    const absolutePosterUrl = convertToPosterUrl({ relativePath: movieData.posterPath, width: 200 });
    const movie = new Movie(movieData);

    expect(movie.data).toEqual({ ...movieData, posterPath: absolutePosterUrl });
  });
});
