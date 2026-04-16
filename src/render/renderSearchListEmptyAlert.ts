function createSearchListrEmptyAlertTemplate() {
  return /*html*/`
    <div class="empty-list-alert">
      <img src="${import.meta.env.BASE_URL}svg/planet.svg" alt="행성이" />
      <p class="empty-list-message">검색 결과가 없습니다.</p>
    </div>
  `
}

export default function renderSearchListEmptyAlert() {
  const listEl = document.querySelector(".thumbnail-list");

  if (!listEl) return;

  if (listEl.children.length === 0) {
    listEl.insertAdjacentHTML(
      "afterend", createSearchListrEmptyAlertTemplate(),
    );
  } else {
    document.querySelector('.empty-list-alert')?.remove();
  }
}