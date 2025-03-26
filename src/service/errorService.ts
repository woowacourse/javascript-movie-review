import { hideElement, showElement } from "../view/MovieView";
export function handleConnectionError(): void {
  const $hero = document.getElementById("hero");
  const $thumbnailContainer = document.getElementById("thumbnail-container");
  const $fallback = document.getElementById("fallback");
  const $fallbackDetails = document.getElementById("fallback-details");

  hideElement($hero);
  hideElement($thumbnailContainer);
  showElement($fallback);
  $fallbackDetails.innerText =
    "뭔가 잘못되었어요. 인터넷 상태를 체크하신뒤 세로 고침을 해주세요!";
}
export function checkApiAvailability(infiniteScrollInstance, delay = 3000) {
  setTimeout(() => {
    fetch("https://api.themoviedb.org/3/movie/popular")
      .then((response) => {
        if (response.ok) {
          infiniteScrollInstance.resumeInfiniteScroll();
        } else {
          checkApiAvailability(delay * 2);
        }
      })
      .catch((error) => {
        Toast.showToast(
          "서버의 상황이 좋지 않아 접속을 다시 시도를 하고 있어요.... 잠깐 기다려 보세요...",
          "info",
          2000
        );
        checkApiAvailability(delay * 2);
      });
  }, delay);
}
