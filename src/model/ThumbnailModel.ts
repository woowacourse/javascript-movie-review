import Observable from "../core/Observable";
import { IMovieItem } from "../types/movieResultType";

export default class ThumbnailModel extends Observable<IMovieItem | null> {
  constructor() {
    super(null);
  }

  setThumbnail(movie: IMovieItem) {
    this.setValue(movie);
  }
}
