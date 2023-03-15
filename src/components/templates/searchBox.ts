import { SearchBoxState } from '../../types/searchBox';

export const showSearchInputTemplate = ({ className, placeholder }: SearchBoxState) =>
  /* html */
  `
		<div class="${className}">
			<input type="text" placeholder="${placeholder}" />
		</div>
	`;
