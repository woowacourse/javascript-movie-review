import { IMAGES } from '../../assets/images';

export const customHeaderTemplate =
  /* html */
  `
		<custom-header>
			<h1>
				<img id="logo" src=${IMAGES.LOGO} alt="MovieList 로고" />
			</h1>
			<form class="search-box">
				<label for="search-input">
					<input class="search-input" id="search-input" name="search-input" type="text" placeholder="검색" />
					<button class="search-button">검색</button>
				</label>
			</form>
		</custom-header>
	`;
