import clientAssets from './mock/movies.json';
class MovieAPIService {
  constructor() {}

  async getMovies() {
    return await fetch('https://').then(res => res.json());
  }
}

const assetsFetchMock = str =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: async () => clientAssets,
  } as Response);

describe('TMDB API서비스 테스트', () => {
  jest.spyOn(global, 'fetch').mockImplementation(assetsFetchMock);
  it('영화 목록을 인기순으로 불러온다.', async () => {
    const movieAPIService = new MovieAPIService();
    const RESULT = await fetch('').then(res => res.json());

    const MOVIES = await movieAPIService.getMovies();

    expect(MOVIES).toEqual(RESULT);
  });

  it('영화목록을 추가로 요청했을 때, 20개 단위로 영화 목록을 보여준다.', () => {});
  it('영화 검색했을 때, 검색어를 포함하는 영화 목록을 반환한다.', () => {});
});
