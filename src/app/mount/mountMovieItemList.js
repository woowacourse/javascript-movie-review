import { $ } from "../../util/querySelector";

export default function mountMovieItemList(movieItemList) {
  const $container = $("#thumbnail-container");
  $container?.insertBefore(
    movieItemList.$el,
    $container.querySelector(".skeleton-list")
  );
}
