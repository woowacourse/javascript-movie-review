export function emptyListRender() {
  const thumbnailList = document.querySelector<HTMLElement>(".thumbnail-list");
  const addBtn = document.querySelector<HTMLButtonElement>("#add-button");

  const emptyList = /*html*/ `
        <li class="thumbnail-empty">
            <img src="../../public/images/empty_icon.png" alt="empty list" class="empty-icon" />
            <p class="empty-message">검색 결과가 없습니다.</p>
        </li>
    `;

  if (thumbnailList) {
    thumbnailList.innerHTML = emptyList;
  }

  if (addBtn) {
    addBtn.style.display = "none";
  }
}
