import { $ } from "../../util/querySelector";

export default function mountLoadMoreButton(loadMoreButton) {
  const $container = $("#thumbnail-container");
  $container?.append(loadMoreButton.$el);
}
