interface MovieListProps {
  className: string;
  cardTemplateList: string;
}

export const showMovieList = ({ className, cardTemplateList }: MovieListProps) =>
  /* html */
  `
		<ul class="${className}">
			${cardTemplateList}
		</ul>
	`;
