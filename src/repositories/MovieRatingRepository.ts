import { MOVIE_USER_RATING_STORAGE_KEY } from "../constants/constant";
import type { MovieUserRating } from "../../types/movieRating";
import { isMovieUserRating } from "../services/MovieRatingService";

type StorageLike = Pick<Storage, "getItem" | "setItem">;
type StoredMovieRatings = Record<string, MovieUserRating>;

//인터페이스로 저장소를 만들어놓고 나중에 클래스만 바꿔서 갈아낄 수 있게
export interface MovieRatingRepository {
  get(movieId: number): Promise<MovieUserRating | null>;
  getMany(movieIds: number[]): Promise<Record<number, MovieUserRating | null>>;

  set(movieId: number, rating: MovieUserRating): Promise<void>;
}

//로컬스토리지로 사용하기 위해 인터페이스 가져다가 사용
class LocalStorageMovieRatingRepository implements MovieRatingRepository {
  private memoryCache: StoredMovieRatings | null = null;

  constructor(private storage?: StorageLike | null) {}

  //get ratings in localstorage
  private readRatings(): StoredMovieRatings {
    if (this.memoryCache) {
      return this.memoryCache;
    }

    if (!this.storage) {
      return {};
    }

    try {
      const storedValue = this.storage.getItem(MOVIE_USER_RATING_STORAGE_KEY);

      if (!storedValue) {
        return {};
      }

      const parsedValue = JSON.parse(storedValue);

      if (!parsedValue) {
        return {};
      }

      const ratings: StoredMovieRatings = {};
      for (const [movieId, rating] of Object.entries(parsedValue)) {
        if (isMovieUserRating(rating)) {
          ratings[movieId] = rating;
        }
      }

      return ratings;
    } catch {
      return {};
    }
  }

  //set ratings in localstorage
  private writeRatings(ratings: StoredMovieRatings) {
    if (!this.storage) {
      this.memoryCache = ratings;
      return;
    }

    try {
      this.storage.setItem(MOVIE_USER_RATING_STORAGE_KEY, JSON.stringify(ratings));
    } catch (error) {
      console.error("Failed to save ratings to storage:", error);
      this.memoryCache = ratings;
    }
  }

  async get(movieId: number) {
    const ratings = this.readRatings();

    return ratings[String(movieId)] ?? null;
  }

  async getMany(movieIds: number[]) {
    const ratings = this.readRatings();

    const result: Record<number, MovieUserRating | null> = {};
    for (const movieId of movieIds) {
      result[movieId] = ratings[String(movieId)] ?? null;
    }

    return result;
  }

  async set(movieId: number, rating: MovieUserRating) {
    const ratings = this.readRatings();

    ratings[String(movieId)] = rating;
    this.writeRatings(ratings);
  }
}

//테스트할 때만 mock storage 넣어주고, 일반적으론 매개변수 없이 사용하여 window의 로컬 스토리지 사용
export const createMovieRatingRepository = (storage?: StorageLike | null) => {
  if (storage !== undefined) {
    return new LocalStorageMovieRatingRepository(storage);
  }

  if (typeof window !== "undefined") {
    return new LocalStorageMovieRatingRepository(window.localStorage);
  }
  return new LocalStorageMovieRatingRepository(null);
};
