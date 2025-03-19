const EmptySearchResult = () => {
  const emptySearchResult = document.createElement("div");
  emptySearchResult.classList.add("empty-search-result-container");

  emptySearchResult.innerHTML = /*html*/ `
    <img src="./images/으아아행성이.png" alt="검색 결과가 없습니다." class="empty-search-result-image"/>
    <p class="empty-search-result-text">검색 결과가 없습니다.</p>
  `;

  return emptySearchResult;
};

export default EmptySearchResult;
