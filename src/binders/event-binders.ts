import type { InfiniteScrollInstance } from "../service/scrollService";
import { hideElement, showElement } from "../view/MovieView";
import handleItemClick from "../service/detailService";
import { getShowingItem } from "../state/movieState";
import { ratingMessages, ratingNumbers } from "../setting/settings";

declare global {
  interface Window {
    _loadingEventRegistered?: boolean;
  }
}

function bindLoadingEvents() {
  if (!window._loadingEventRegistered) {
    document.addEventListener("loading:start", () => {
      const skeleton = document.querySelector(".skeleton-list");
      const loadMore = document.getElementById("load-more");
      if (skeleton) showElement(skeleton);
      if (loadMore) hideElement(loadMore);
    });

    document.addEventListener("loading:end", (e: Event) => {
      const skeleton = document.querySelector(".skeleton-list");
      const loadMore = document.getElementById("load-more");

      const customEvent = e as CustomEvent<{ isLastPage: boolean }>;

      if (skeleton) hideElement(skeleton);
      if (loadMore && (!customEvent.detail || !customEvent.detail.isLastPage)) {
        showElement(loadMore);
      }
    });

    window._loadingEventRegistered = true;
  }
}

function bindThumbnailClickEvent() {
  const thumbnailList = document.getElementById("thumbnail-list");

  thumbnailList?.addEventListener("click", async (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    const liElement = target?.closest("li") as HTMLElement | null;

    if (liElement?.id) {
      await handleItemClick(liElement.id);
    }
  });
}

function bindOnlineEvent(infiniteScrollInstance: InfiniteScrollInstance) {
  window.addEventListener("online", () => {
    infiniteScrollInstance?.resumeInfiniteScroll();
  });
}

function bindDetailsImageLoadEvent() {
  const detailsImage = document.getElementById("details-image");
  if (!detailsImage) return;
  detailsImage.addEventListener("load", () => {
    const skeleton = document.getElementById("details-skeleton");
    hideElement(skeleton);
    showElement(detailsImage);
  });
}

function bindModalEvents() {
  const modal = document.getElementById("modal-dialog");
  if (!(modal instanceof HTMLDialogElement)) return;

  const closeModalBtn = document.getElementById("closeModal");
  if (!closeModalBtn) return;

  closeModalBtn.addEventListener("click", () => {
    modal.close();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
}

function bindStarRatingEvents() {
  const radios = document.querySelectorAll('input[name="star-rating"]');
  for (const radio of radios) {
    radio.addEventListener("change", () => {
      const starRatingDetails = document.getElementById("star-rating-details");
      const starRatingNumbers = document.getElementById("star-rating-numbers");

      if (
        !(starRatingDetails instanceof HTMLElement) ||
        !(starRatingNumbers instanceof HTMLElement)
      ) {
        return;
      }

      if (!(radio instanceof HTMLInputElement)) {
        return;
      }

      const ratingValue = radio.value as keyof typeof ratingMessages;

      if (!ratingMessages[ratingValue] || !ratingNumbers[ratingValue]) {
        return;
      }

      starRatingDetails.innerText = ratingMessages[ratingValue];
      starRatingNumbers.innerText = ratingNumbers[ratingValue];
      localStorage.setItem(getShowingItem(), String(ratingValue));
    });
  }
}

export {
  bindDetailsImageLoadEvent,
  bindLoadingEvents,
  bindModalEvents,
  bindOnlineEvent,
  bindStarRatingEvents,
  bindThumbnailClickEvent,
};
