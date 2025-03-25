import fetchAndSetLoadingEvent from "./fetchService";
import { renderMovieItems } from "../view/MovieView";
import type { StateTypes } from "../state/state";
// 이코드는 gpt로 만들었으니 제대로 이해 못하고 그냥 쓰게 된다면 자신의 머리를 한번 쥐어 박으세요.
export function setupInfiniteScroll(state: StateTypes) {
  const $thumbnailContainer = document.getElementById("thumbnail-container");
  if (!$thumbnailContainer) return;

  // 스크롤 감지를 위한 sentinel 엘리먼트 생성
  const sentinel = document.createElement("div");
  sentinel.id = "infinite-scroll-sentinel";
  $thumbnailContainer.append(sentinel);

  // infinite scroll이 일시 중단되었는지 여부를 나타내는 플래그
  let infiniteScrollSuspended = false;

  const observer = new IntersectionObserver(
    async (entries) => {
      // 중단된 경우에는 추가 동작 없이 바로 반환
      if (infiniteScrollSuspended) return;
      const entry = entries[0];
      if (entry.isIntersecting) {
        // sentinel 감시 일시 중단
        observer.unobserve(sentinel);

        // 데이터 불러오기 및 렌더링

        const data = await fetchAndSetLoadingEvent(state);
        renderMovieItems(data.results, false);

        // 마지막 페이지라면 infinite scroll을 중단(플래그 설정)
        if (data.isLastPage) {
          infiniteScrollSuspended = true;
        } else {
          // 마지막 페이지가 아니라면 다시 sentinel을 추가하고 감시
          $thumbnailContainer.append(sentinel);
          observer.observe(sentinel);
        }
      }
    },
    {
      root: null, // 뷰포트를 기준으로 감시
      threshold: 0.4, // sentinel이 10% 보이면 콜백 실행
    }
  );

  // 초기 감시 시작
  observer.observe(sentinel);

  // 새로운 검색 등으로 infinite scroll을 재개할 때 사용할 함수
  function resumeInfiniteScroll() {
    if (infiniteScrollSuspended) {
      infiniteScrollSuspended = false;
      // 기존 sentinel이 없다면 재생성 또는 재삽입
      if (!document.getElementById("infinite-scroll-sentinel")) {
        $thumbnailContainer.append(sentinel);
      }
      observer.observe(sentinel);
    }
  }

  // 필요 시 외부에서 재개 함수에 접근할 수 있도록 반환
  return { observer, resumeInfiniteScroll };
}
