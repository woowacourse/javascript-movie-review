import { SearchBoxProps } from '../../types/searchBox';

export const showSearchBoxTemplate = ({ className, id, inputId, placeholder }: SearchBoxProps) =>
  /* html */
  `
		<form class="${className}" id="${id}">
			<label for="${inputId}">
				<input class="search-input" id="${inputId}" type="text" name="${inputId}" placeholder="${placeholder}" />
				<button class="search-button">검색</button>
			</label>
		</form>
	`;
