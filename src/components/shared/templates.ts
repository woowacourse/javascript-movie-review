import { IMAGES } from '../../assets/images';

export const templates = {
  /* html */
  Logo: `
		<h1>
			<img src=${IMAGES.LOGO} alt="MovieList 로고" />
		</h1>
	`,
  /* html */
  searchBox: `
		<div class="search-box">
			<input type="text" placeholder="검색" />
			<button class="search-button">검색</button>
		</div>
	`,
};
