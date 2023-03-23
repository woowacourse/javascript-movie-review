import { movie } from '../../state/state';

export const generateContainerTitleTemplate = () => {
  return `${movie.query ? `"${movie.query}" 검색 결과` : '지금 인기 있는 영화'}`;
};
