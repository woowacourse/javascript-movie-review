import { movie } from '../../state/state';

export const containerTitleTemplate =
  /* html */
  `
		<h2>${movie.query ? `"${movie.query}" 검색 결과` : '지금 인기 있는 영화'}</h2>
	`;
