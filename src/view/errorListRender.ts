export function errorListRender() {
  const thumbnailList = document.querySelector<HTMLElement>(".thumbnail-list");
  const addBtn = document.querySelector<HTMLButtonElement>("#add-button");

  const errorList = /*html*/ `
        <li class="thumbnail-empty">
            <img src="../../public/images/empty_icon.png" alt="empty list" class="empty-icon" />
            <p class="empty-message">영화 정보를 불러오지 못했습니다. 다시 시도해주세요.</p>
        </li>
    `;

  if (thumbnailList) {
    thumbnailList.innerHTML = errorList;
  }

  if (addBtn) {
    addBtn.style.display = "none";
  }
}
