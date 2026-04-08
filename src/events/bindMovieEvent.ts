import { getElement } from "../view/getElementView.ts";

type handler = {
  onMore: () => void;
  onSearch: (keyword: string) => void;
  onClick: (title: string) => void;
};

export const bindMovieEvents = ({ onMore, onSearch, onClick }: handler) => {
  // 핸들러를 인자로 받아 연결해주기만 하기

  // 1. 더 보기 버튼
  // const moreBtn = getElement(".display-more-btn");
  // moreBtn.addEventListener("click", () => {
  //   onMore();
  // });
  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2)
      onMore();
  });

  // 2. 검색 기능
  const searchBar = getElement(".search-bar", HTMLInputElement);
  searchBar.addEventListener("keydown", (event) => {
    if (event.isComposing) return;
    if (event.key === "Enter") onSearch(searchBar.value);
  });
  const searchBtn = getElement(".search-btn", HTMLButtonElement);
  searchBtn.addEventListener("click", () => {
    onSearch(searchBar.value);
  });

  // 3. 클릭 기능
  const thumbnailList = getElement(".thumbnail-list", HTMLElement);
  thumbnailList.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const item = target.closest(".item");
    const title = item?.querySelector(".title")?.textContent;

    if (!title) return;
    onClick(title);
  });
};
