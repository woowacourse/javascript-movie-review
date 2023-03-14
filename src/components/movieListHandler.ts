import { movieApi } from "../domain/movieApi";
import { executeEventListener } from "../utils/eventListener";
import { $ } from "../utils/selector";

export const onClickMoreButton = () => {
  executeEventListener(
    $("#more-button"),
    "click",
    async () => await movieApi.fetchMovieInfo()
  );
};
