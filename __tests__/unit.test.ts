import { Theater } from '../src/domain/Theater';

describe('Theater 도메인 테스트', () => {
  test('영화 정보 요청이 정상적으로 가능하다', async () => {
    const theater = new Theater();

    const page = 1;
    const data = await theater.load(page, { env: 'dev' });

    expect(data).toEqual({
      adult: false,
      backdrop_path: '/jr8tSoJGj33XLgFBy6lmZhpGQNu.jpg',
      genre_ids: [16, 12, 35, 10751],
      id: 315162,
      original_language: 'en',
      original_title: 'Puss in Boots: The Last Wish',
      overview:
        'Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.',
      popularity: 2531.473,
      poster_path: '/kuf6dutpsT0vSVehic3EZIqkOBt.jpg',
      release_date: '2023-01-04',
      title: 'Its dummy',
      video: false,
      vote_average: 8.4,
      vote_count: 4541,
    });
  });
});
