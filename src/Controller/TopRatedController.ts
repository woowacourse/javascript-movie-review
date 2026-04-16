import { fetchTopRatedMovie } from "../api/fetchMovies";
import { extractThumbnailInfo } from "../thumnailManager";
import TopRatedView from "../View/TopRatedView";

class TopRatedController {
  #topRatedView;

  constructor(topRatedView: TopRatedView) {
    this.#topRatedView = topRatedView;
  }

  hideBanner() {
    this.#topRatedView.hide();
  }

  async loadBanner() {
    try {
      const movie = await fetchTopRatedMovie();
      this.#topRatedView.render(extractThumbnailInfo(movie)[0]);
    } catch (error) {
      alert((error as Error).message);
    }
  }
}

export default TopRatedController;
