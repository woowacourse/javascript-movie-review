export default function renderSearchListTitle(query: string) {
  const listTitleEl = document.querySelector('.list-title');

  if (listTitleEl) {
    listTitleEl.textContent = `"${query}" 검색 결과`
  }
}