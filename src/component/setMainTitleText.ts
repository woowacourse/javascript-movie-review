import { PageType } from '../interface/pageType';
import { $ } from '../util/selector';

const TITLE_LIST = {
  popular: () => '지금 인기있는 영화',
  search: (keyword: string) => `"${keyword}" 검색 결과`,
};

function setMainTitleText(pageType: PageType, optionalText?: string) {
  const titleElement = $<HTMLHeadingElement>('.main-title');

  if (titleElement) titleElement.textContent = TITLE_LIST[pageType](optionalText || '');
}

export { setMainTitleText };
