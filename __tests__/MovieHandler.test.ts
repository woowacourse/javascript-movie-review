import MovieHandler from '../src/domain/MovieHandler';
import { Movie } from '../src/type/Movie';
import { MovieAPIData } from '../src/api/get';

describe('MovieHandler객체 테스트', () => {
  test('API 영화 데이터 배열을 받아 가공한 배열을 반환한다..', () => {
    const movieAPIData: MovieAPIData[] = [
      {
        adult: false,
        backdrop_path: '/jr8tSoJGj33XLgFBy6lmZhpGQNu.jpg',
        genre_ids: [16, 12],
        id: 315162,
        original_language: 'en',
        original_title: 'Puss in Boots: The Last Wish',
        overview:
          "아홉 개의 목숨 중 단 하나의 목숨만 남은 장화신은 고양이.  마지막 남은 목숨을 지키기 위해 히어로의 삶 대신 반려묘의 삶을 선택한 그에게 찾아온 마지막 기회, 바로 소원을 들어주는 소원별이 있는 곳을 알려주는 지도!  잃어버린 목숨을 되찾고 다시 히어로가 되기를 꿈꾸는 장화신은 고양이는 뜻밖에 동료가 된 앙숙 파트너 '키티 말랑손', 그저 친구들과 함께라면 모든 게 행복한 강아지 '페로'와 함께 소원별을 찾기 위해 길을 떠난다.  그리고 소원별을 노리는 또 다른 빌런들과 마주치게 되는데…",
        popularity: 1972.345,
        poster_path: '/rKgvctIuPXyuqOzCQ16VGdnHxKx.jpg',
        release_date: '2022-12-07',
        title: '장화신은 고양이: 끝내주는 모험',
        video: false,
        vote_average: 8.4,
        vote_count: 4613,
      },
    ];

    const movieList = MovieHandler.convertMovieList(movieAPIData);

    const expected: Movie[] = [
      {
        id: 315162,
        posterPath: '/rKgvctIuPXyuqOzCQ16VGdnHxKx.jpg',
        title: '장화신은 고양이: 끝내주는 모험',
        voteAverage: 8.4,
      },
    ];

    expect(expected).toEqual(movieList);
  });
});
