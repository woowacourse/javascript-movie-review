import planetSrc from "../../templates/images/으아아행성이.png";

export function createEmpty(): HTMLElement {
  const div = document.createElement("div");
  div.className = "movie-list-message-content";

  const img = document.createElement("img");
  img.src = planetSrc;
  img.alt = "검색 결과 없음";

  const p = document.createElement("p");
  p.textContent = "검색 결과가 없습니다.";

  div.append(img, p);

  return div;
}
