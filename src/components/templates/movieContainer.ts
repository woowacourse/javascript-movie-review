import { MovieContainerProps } from '../../types/movieContainer';

export const showMovieContainer = ({ className, title }: MovieContainerProps) =>
  /* html */
  `
	<section class="${className}">
		<h2>${title}</h2>
	</section>
	`;
