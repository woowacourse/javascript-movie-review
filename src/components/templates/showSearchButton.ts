import { SearchButtonProps } from '../../types/searchButton';

export const showSearchButtonTemplate = ({ className, src }: SearchButtonProps) =>
  /* html */
  `
	<input type="image" src="${src}" class="${className}" />
`;
