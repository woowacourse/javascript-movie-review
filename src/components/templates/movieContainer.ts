import { MovieContainerProps } from '../../types/movieContainer';

export const showMovieContainer = ({ className, id, query }: MovieContainerProps) =>
  /* html */
  `
	<section class="${className}" id="${id}">
	<h2>${query === '' ? '지금 인기 있는 영화' : `"${query}" 검색 결과`}</h2>
	</section>
	`;
