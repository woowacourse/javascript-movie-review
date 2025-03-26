import { Button } from "./components/index";
import { renderMoviesList } from "./domains/renderMoviesList";
import "./events/handlers";

addEventListener("load", async () => {
  // TODO: 더 보기 버튼 삭제 예정 (2단계에서 무한 스크롤로 대체)
  const $container = document.querySelector(".container");

  $container?.appendChild(
    Button({ className: "show-more", textContent: "더 보기" })
  );

  renderMoviesList();
});
