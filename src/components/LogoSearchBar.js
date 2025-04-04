function LogoSearchBar() {
  const container = document.createElement("div");
  container.classList.add("logo-searchBar");

  container.innerHTML = `
    <h1 class="logo">
      <img src="images/logo.png" alt="MovieList" />
    </h1>
    <div class="search-container">
      <input placeholder="검색어를 입력하세요." class="search-input"/> 
      <button class="search-button">
        <img src="images/search.svg" alt="검색"/>
      </button> 
    </div>
  `;

  return container;
}

export default LogoSearchBar;
