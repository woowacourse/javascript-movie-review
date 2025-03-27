import {
  updateDetails,
  updateHero,
  showElement,
  hideElement,
} from "../view/MovieView";

import Toast from "../components/Toast/Toast";
import { fetchUrl } from "../util/fetch";
import { defaultOptions, defaultQueryObject, URLS } from "../setting/settings";
import { setShowingItem } from "../state/movieState";
import type { TMDBDetails } from "../../types/tmdb.types";

export default async function handleItemClick(id: string) {
  try {
    const result = await fetchUrl<TMDBDetails>(
      URLS.detailsMovieUrl,
      defaultQueryObject,
      defaultOptions,
      id
    );

    updateDetails(result);
    updateHero(result);
    setShowingItem(id);
    const skeleton = document.getElementById("details-skeleton");
    const detailsImage = document.getElementById("details-image");
    showElement(skeleton);
    hideElement(detailsImage);
    const modal = document.getElementById(
      "modal-dialog"
    ) as HTMLDialogElement | null;

    if (modal) {
      modal.showModal();
    }
  } catch (error: unknown) {
    if (error instanceof Error) Toast.showToast(error.message, "error", 5000);
  }
}
