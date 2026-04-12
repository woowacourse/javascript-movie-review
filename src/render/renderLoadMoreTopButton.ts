export default function renderLoadMoreTopButton(hasPrevPage: boolean, callback: () => void) {
  let loadMoreTopButtonElement = document.querySelector<HTMLButtonElement>(".load-more-top-button");

  if (!hasPrevPage) {
    loadMoreTopButtonElement?.remove();
    return;
  }

  if (!loadMoreTopButtonElement) {
    loadMoreTopButtonElement = document.createElement("button");
    loadMoreTopButtonElement.classList.add("load-more-top-button", "primary");
    loadMoreTopButtonElement.textContent = "더보기";
    loadMoreTopButtonElement.addEventListener("click", callback);

    const list = document.querySelector(".thumbnail-list");
    list?.insertAdjacentElement("beforebegin", loadMoreTopButtonElement);
  }

  return loadMoreTopButtonElement;
}
