import { movieDataStateStore } from "../model";
import { handleGetPopularMovieData } from "../service/handleSkeletonAndAPI";

import renderItemView from "./ItemView";
import renderSkeletonView from "./SkeletonList";

const ViewContainer = async () => {
  renderSkeletonView();
  await handleGetPopularMovieData();
  renderItemView({
    titleText: "지금 인기 있는 영화",
    movieData: movieDataStateStore.totalMovieData,
    listType: "popular",
  });
};
export default ViewContainer;
