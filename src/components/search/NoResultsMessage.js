export default class NoResultsMessage {
  render() {
    const noResultsItem = document.createElement('div');
    noResultsItem.classList.add('no-results');
    noResultsItem.innerHTML = /*html*/ `
      <img src="./images/aaaahangsung.png" alt="no results" class="no-results-image">
      <p class="no-results-text">검색 결과가 없습니다</p>
    `;
    return noResultsItem;
  }
}
