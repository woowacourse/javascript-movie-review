export default class SearchBar {
  constructor(onSearch) {
    this.onSearch = onSearch;
    this.searchInput = null;
    this.searchButton = null;
  }

  createSearchBar() {
    const searchHeader = document.querySelector('.search-header');
    if (!searchHeader) {
      throw new Error('.search-header 요소를 찾을 수 없습니다.');
    }

    searchHeader.innerHTML += `
      <div class="search-bar-container">
        <form class="search-form">
          <input 
            class="search-bar-input" 
            placeholder="검색어를 입력하세요..." 
            name="query"
          />
          <button class="search-bar-button" type="submit">
            <img src="images/find.png" alt="검색" class="search-icon" />
          </button>
        </form>
      </div>
    `;

    this.searchInput = searchHeader.querySelector('.search-bar-input');
    this.searchForm = searchHeader.querySelector('.search-form');

    this.searchForm.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const query = this.searchInput.value;
    await this.onSearch(query);
  }
}