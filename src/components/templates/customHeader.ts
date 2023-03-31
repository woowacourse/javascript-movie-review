import { IMAGES } from '../../assets/images';

export const customHeaderTemplate =
  /* html */
  `
		<custom-header>
			<h1>
				<a href="/javascript-movie-review/">
					<img class="logo" id="logo" src=${IMAGES.LOGO} alt="MovieList 로고" />
				</a>
			</h1>
			<form class="search-box">
				<label for="search-input">
					<input class="search-input" id="search-input" name="search-input" type="text" placeholder="검색" aria-label="검색" />
				</label>
				<button class="search-button">
					<img src="${IMAGES.SEARCH_BUTTON}" alt="검색">
				</button>
			</form>
			<button class="search-button mobile-button mobile-button--open" aria-label="검색창 열기">
				<img src="${IMAGES.SEARCH_BUTTON}" alt="검색창 열기">
			</button>
		</custom-header>
	`;
