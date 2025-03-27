import MainController from "./controller/MainController";
import MovieListModel from "./model/MovieListModel";
import ThumbnailModel from "./model/ThumbnailModel";
import BackgroundThumbnailView from "./view/BackgroundThumbnailView";
import MessageModalView from "./view/MessageModalView";
import MovieListView from "./view/MovieListView";
import BackgroundThumbnailViewModel from "./viewModel/BackgroundThumbnailViewModel";
import MovieListViewModel from "./viewModel/MovieListViewModel";

const main = new MainController();

new MovieListViewModel(
  new MovieListModel(),
  new MovieListView(),
  new BackgroundThumbnailViewModel(
    new BackgroundThumbnailView(),
    new ThumbnailModel(),
    new MessageModalView(),
  ),
);

main.render();
