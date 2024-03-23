import { dataStateStore } from "../model";
import { handleGetPopularMovieData } from "../service/handleSkeletonAndAPI";

import renderItemView from "./ItemView";
import renderSkeletonView from "./SkeletonList";

const ViewContainer = async () => {
  renderSkeletonView();
  await handleGetPopularMovieData();
  renderItemView("지금 인기 있는 영화", dataStateStore.movieData, "popular");
};
export default ViewContainer;
