import { IMovie } from '../src/types/movie';
import MovieStorageService from '../src/domains/MovieStorageService';

class StorageMock implements Storage {
  store: Map<string, string> = new Map();

  clear() {
    this.store = new Map();
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }
  get length(): number {
    return Object.keys(this.store).length;
  }
  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
}

describe('MovieStorageService 테스트', () => {
  it('영화 하나를 저장했을 때, 저장한 영화 하나가 불러와진다.', () => {
    const MOVIE: IMovie = {
      id: 1,
      title: '제목',
      imageSrc: 'http://www.abc.com/a.jpg',
      score: 5,
      genre: ['Action'],
      description: '설명',
    };

    const movieStorageService = new MovieStorageService(new StorageMock());
    movieStorageService.save([MOVIE]);
    const EXPECTED_RESULT = [MOVIE];

    const MOVIES_RESULT = movieStorageService.load();

    expect(MOVIES_RESULT).toEqual(EXPECTED_RESULT);
  });
});
