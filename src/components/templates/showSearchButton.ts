import { SearchButtonProps } from '../../types/searchButton';

export const showSearchButtonTemplate = ({ className, id, src }: SearchButtonProps) =>
  /* html */
  `
	<input type="image" src="${src}" class="${className}" id="${id}" />
`;
