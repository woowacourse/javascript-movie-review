import type { InfiniteScrollInstance } from "../service/scrollService";
import { hideElement, showElement } from "../view/MovieView";
import handleItemClick from "../service/detailService";
import { getShowingItem } from "../state/movieState";
import { ratingMessages, ratingNumbers } from "../setting/settings";
import { URLS, defaultOptions } from "../setting/settings";
import Toast from "../components/Toast/Toast";
import { LOADING_EVENTS } from "../../types/events";

const handleLoadingStart = () => {
  const skeleton = document.querySelector(".skeleton-list");
  const loadMore = document.getElementById("load-more");
  if (skeleton) showElement(skeleton);
  if (loadMore) hideElement(loadMore);
};

const handleLoadingEnd = () => {
  const skeleton = document.querySelector(".skeleton-list");
  if (skeleton) hideElement(skeleton);
};

let isLoadingEventRegistered = false;

function bindLoadingEvents() {
  if (!isLoadingEventRegistered) {
    document.addEventListener(LOADING_EVENTS.START, handleLoadingStart);
    document.addEventListener(LOADING_EVENTS.END, handleLoadingEnd);
    isLoadingEventRegistered = true;
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
  const starRatingDetails = document.getElementById(
    "star-rating-details"
  ) as HTMLElement;
  const starRatingNumbers = document.getElementById(
    "star-rating-numbers"
  ) as HTMLElement;

  const radios = document.querySelectorAll('input[name="star-rating"]');
  for (const radio of radios) {
    radio.addEventListener("change", () => {
      if (!(radio instanceof HTMLInputElement)) return;

      const ratingValue = radio.value as keyof typeof ratingMessages;
      if (!ratingMessages[ratingValue] || !ratingNumbers[ratingValue]) return;

      starRatingDetails.innerText = ratingMessages[ratingValue];
      starRatingNumbers.innerText = ratingNumbers[ratingValue];

      const showingItem = getShowingItem();
      localStorage.setItem(showingItem, String(ratingValue));
    });
  }
}

function bindHeaderScrollEvent() {
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    // 스크롤 위치가 50px 이상이면 dim 클래스를 추가
    if (window.scrollY > 50) {
      header?.classList.add("dim");
    } else {
      header?.classList.remove("dim");
    }
  });
}

function bindHeroEvents() {
  const heroImg = document.getElementById("hero-img") as HTMLImageElement;
  const heroSkeleton = document.getElementById("hero-skeleton");
  const topRatedContainer = document.getElementById("top-rated-container");
  const heroButton = document.getElementById("hero-details-button");
  const modal = document.getElementById("modal-dialog") as HTMLDialogElement;

  if (heroImg) {
    heroImg.addEventListener("load", () => {
      hideElement(heroSkeleton);
      showElement(topRatedContainer);
    });
  }

  if (heroButton && modal) {
    heroButton.addEventListener("click", () => {
      modal.showModal();

      const loadingSpinner = document.getElementById("detail-loading");
      const modalContainer = document.getElementById("modal-container");

      if (loadingSpinner && modalContainer) {
        hideElement(loadingSpinner);
        showElement(modalContainer);
      }

      const detailsSkeleton = document.getElementById("details-skeleton");
      const detailsImage = document.getElementById(
        "details-image"
      ) as HTMLImageElement;

      if (detailsSkeleton && detailsImage) {
        showElement(detailsSkeleton);
        hideElement(detailsImage);

        // 이미지가 이미 캐시되어 있어서 onload가 발생하지 않을 수 있으므로
        // 이미지가 완전히 로드되었는지 확인
        if (detailsImage.complete) {
          hideElement(detailsSkeleton);
          showElement(detailsImage);
        } else {
          detailsImage.onload = () => {
            hideElement(detailsSkeleton);
            showElement(detailsImage);
          };
        }
      }
    });
  }
}

function bindLoadMoreButton(infiniteScrollInstance: InfiniteScrollInstance) {
  const loadMoreButton = document.getElementById("load-more");
  if (!loadMoreButton) return;

  loadMoreButton.addEventListener("click", async () => {
    try {
      const response = await fetch(URLS.config, {
        ...defaultOptions,
        method: "GET",
      });

      if (response.ok) {
        if (infiniteScrollInstance) {
          infiniteScrollInstance.resumeInfiniteScroll();
        }
      } else {
        Toast.showToast(
          "인터넷 연결을 확인하고 더보기 버튼을 눌러주세요.",
          "error",
          2000
        );
      }
    } catch (error) {
      Toast.showToast(
        "인터넷 연결을 확인하고 더보기 버튼을 눌러주세요.",
        "error",
        2000
      );
    }
  });
}

function bindAllEvents(infiniteScrollInstance: InfiniteScrollInstance) {
  bindLoadingEvents();
  bindThumbnailClickEvent();
  bindModalEvents();
  bindStarRatingEvents();
  bindHeaderScrollEvent();
  bindHeroEvents();
  bindLoadMoreButton(infiniteScrollInstance);
}

export {
  bindDetailsImageLoadEvent,
  bindLoadingEvents,
  bindModalEvents,
  bindStarRatingEvents,
  bindThumbnailClickEvent,
  bindHeaderScrollEvent,
  bindHeroEvents,
  bindLoadMoreButton,
  bindAllEvents,
};
