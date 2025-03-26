export default function Header() {
  const $header = document.createElement("header");
  $header.className = "background-container";

  $header.innerHTML = /*html*/ `
    <div class="overlay" aria-hidden="true"></div>
    <div class="top-rated-header">
      <a href="/javascript-movie-review">
        <h1 class="logo">
          <img src="./images/logo.png" alt="MovieList" />
        </h1>
      </a>
      <form class="top-rated-search">
        <input
          id="top-rated-search-input"
          class="top-rated-search-input"
          placeholder="검색어를 입력하세요"
        />
        <button type="submit" class="top-rated-search-button">
          <img src="./images/search.svg" alt="MovieSearch" />
        </button>
      </form>
    </div>
    <div class="top-rated-container"></div>
  `;

  return $header;
}
