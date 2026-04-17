import planetSrc from "../../templates/images/으아아행성이.png";

export function createError(): HTMLElement {
  const div = document.createElement("div");
  div.className = "movie-list-message-content";

  const img = document.createElement("img");
  img.src = planetSrc;
  img.alt = "에러 발생";

  const p = document.createElement("p");
  p.textContent = "데이터를 불러오지 못했습니다.";

  div.append(img, p);

  return div;
}
