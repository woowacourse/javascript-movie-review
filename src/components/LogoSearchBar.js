function LogoSearchBar() {
  const container = document.createElement("div");

  container.innerHTML = `
    <h1 class="logo">
      <img src="./logo.png" alt="MovieList" />
    </h1>
    <div class="search-container">
      <input placeholder="검색어를 입력하세요." class="search-input"/> 
      <button class="search-button">
        <img src="./search.svg" alt="검색"/>
      </button> 
    </div>
  `;

  return container;
}

export default LogoSearchBar;
