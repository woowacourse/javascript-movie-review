import { executeEventListener } from "../utils/eventListener";
import { $ } from "../utils/selector";
import { movieApi } from "../domain/movieApi";

export const onSubmitSearchBox = () => {
  executeEventListener($(".search-box"), "submit", async (event) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const keyword = String(formData.get("search-bar"));

    await movieApi.fetchSearchedMovieInfo(keyword);
  });
};

export const onClickLogo = () => {
  executeEventListener(
    $("#logo"),
    "click",
    async () => await movieApi.fetchPopularMovieInfo()
  );
};
