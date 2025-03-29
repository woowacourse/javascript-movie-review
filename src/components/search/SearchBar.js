// src/components/search/SearchBar.js

export default class SearchBar {
  constructor(searchHandler) {
    this.searchHandler = searchHandler;
    this.searchInput = null;
    this.searchButton = null;
  }

  /**
   * 검색바 컴포넌트를 생성하고 이벤트 리스너를 등록.
   */
  createSearchBar() {
    const searchHeader = document.querySelector('.search-header');
    if (!searchHeader) {
      throw new Error('.search-header 요소를 찾을 수 없습니다.');
    }

    // innerHTML을 사용하여 검색바 생성
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
    this.searchButton = searchHeader.querySelector('.search-bar-button');
    const searchForm = searchHeader.querySelector('.search-form');

    searchForm.addEventListener('submit', this.handleSubmit.bind(this));
    this.searchButton.addEventListener('click', this.handleSearchClick.bind(this));
    this.searchInput.addEventListener('keypress', this.handleKeyPress.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const query = this.searchInput.value;
    await this.searchHandler.handleSearch(query);
    store.setMode('searchAdd');
  }
  
  /**
   * 검색 버튼 클릭 이벤트 핸들러
   */
  async handleSearchClick() {
    const query = this.searchInput.value;
    await this.searchHandler.handleSearch(query);
  }

  /**
   * 검색 입력 필드 키 입력 이벤트 핸들러 (엔터키 처리)
   */
  async handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const query = this.searchInput.value;
      await this.searchHandler.handleSearch(query);
    }
  }
}