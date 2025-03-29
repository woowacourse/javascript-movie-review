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
    const modal = document.getElementById(
      "modal-dialog"
    ) as HTMLDialogElement | null;

    if (modal) {
      modal.showModal();
    }

    const loadingSpinner = document.getElementById("detail-loading");
    const modalContainer = document.getElementById("modal-container");

    if (loadingSpinner && modalContainer) {
      showElement(loadingSpinner);
      hideElement(modalContainer);
    }

    const result = await fetchUrl<TMDBDetails>(
      URLS.detailsMovieUrl,
      defaultQueryObject,
      defaultOptions,
      id
    );

    updateDetails(result);
    updateHero(result);
    setShowingItem(id);

    if (loadingSpinner && modalContainer) {
      hideElement(loadingSpinner);
      showElement(modalContainer);
    }
  } catch (error: unknown) {
    const modal = document.getElementById(
      "modal-dialog"
    ) as HTMLDialogElement | null;

    if (modal) {
      modal.close();
    }

    if (error instanceof Error) Toast.showToast(error.message, "error", 5000);
  }
}
