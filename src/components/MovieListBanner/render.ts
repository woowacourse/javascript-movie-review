import createElement from '../../utils/createElement';
import isHTMLElement from '../../utils/isHTMLElement';

const getBannerTextByKeyword = () => {
  const input = document.querySelector('input');
  if (!isHTMLElement(input)) return;

  const inputValue = input.value;
  const text = inputValue ?? `"${inputValue}" 검색 결과`;

  return text;
};

const renderHandler = () => {
  const container = createElement('div', { className: 'banner-container' });
  const bannerText = getBannerTextByKeyword();
  const h2 = createElement('h2', {
    textContent: bannerText ?? '지금 인기있는 영화',
    className: 'result-banner-text',
  });

  container.appendChild(h2);
  return container;
};

export default renderHandler;
