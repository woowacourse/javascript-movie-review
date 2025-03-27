import MovieListModel from "../model/MovieListModel";
import MovieListView from "../view/MovieListView";
import BackgroundThumbnailViewModel from "./BackgroundThumbnailViewModel";

export default class MovieListViewModel {
  #model;
  #listView;
  #thumbnailViewModel;
  #prevMovieCount = 0;

  constructor(
    model: MovieListModel,
    view: MovieListView,
    thumbnailViewModel: BackgroundThumbnailViewModel,
  ) {
    this.#model = model;
    this.#listView = view;
    this.#thumbnailViewModel = thumbnailViewModel;

    this.#model.subscribe(this.#handleModelUpdate.bind(this));
    this.#listView.bindSeeMoreClick(this.#handleSeeMoreClick.bind(this));

    this.#loadInitialMovieList();
  }

  async #loadInitialMovieList() {
    const skeletons = this.#listView.appendLoadingSkeleton(20);
    this.#thumbnailViewModel.renderSkeleton();

    await this.#model.fetchMovies(1);

    this.#listView.removeSkeletons(skeletons);
  }

  async #handleSeeMoreClick() {
    const nextPage = this.#model.getCurrentPage() + 1;
    const skeletons = this.#listView.appendLoadingSkeleton(20);

    await this.#model.fetchMovies(nextPage);

    this.#listView.removeSkeletons(skeletons);
  }

  #handleModelUpdate() {
    const movieList = this.#model.getMovieList();
    const newMovies = movieList.slice(this.#prevMovieCount);

    this.#thumbnailViewModel.setThumbnail(movieList[0]);
    this.#listView.appendMovieList(newMovies);
    this.#listView.toggleSeeMore(this.#model.hasMore());

    this.#prevMovieCount = movieList.length;
  }
}
