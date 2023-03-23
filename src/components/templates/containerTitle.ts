import { proxy } from '../../domains/proxy';

export const generateContainerTitleTemplate = (query: string) => {
  /* html */
  return `
		<h2>${query ? `"${query}" 검색 결과` : '지금 인기 있는 영화'}</h2>
	`;
};
