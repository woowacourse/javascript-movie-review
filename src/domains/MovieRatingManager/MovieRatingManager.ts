import BrowserStorage from "../Storage/Storage";
import { BrowserStorageInterface } from "../Storage/Storage.type";

import { isValidElement } from "../../utils/type";

import { MovieRatingManagerInterface, Rating, RatingItem } from "./MovieRatingManager.type";

export default class MovieRatingManager implements MovieRatingManagerInterface {
  private storage: BrowserStorageInterface<RatingItem[]> | null = null;

  private STORAGE_KEY: string = "movie-score";

  constructor() {
    this.storage = new BrowserStorage<RatingItem[]>(this.STORAGE_KEY, localStorage);
  }

  private getMovieById(id: number) {
    const storedMovies = this.storage?.get();

    return storedMovies?.find(({ movieId }) => movieId === id);
  }

  private add(item: RatingItem) {
    const storedMovies = this.storage?.get();

    if (!storedMovies) {
      this.storage?.set([item]);

      return;
    }

    const updatedMovies = [...storedMovies, item];
    this.storage?.set(updatedMovies);
  }

  private update(item: RatingItem) {
    const storedMovies = this.storage?.get();
    if (!storedMovies) return;

    const updatedMovies = storedMovies?.map((storedMovie) => {
      return storedMovie.movieId !== item.movieId
        ? {
            ...storedMovie,
          }
        : {
            ...item,
            rating: item.rating,
          };
    });

    this.storage?.set(updatedMovies);
  }

  getRatingById(id: number): Rating {
    const movie = this.getMovieById(id);
    if (!movie) return 0;

    return movie.rating;
  }

  updateMovieRating(id: number, rating: number): void {
    if (!isValidElement<number, Rating>([0, 2, 4, 6, 8, 10], rating)) return;

    if (!this.getMovieById(id)) {
      this.add({ movieId: id, rating: rating });
      return;
    }

    this.update({ movieId: id, rating: rating });
  }
}
