import createElement from '../../utils/createElement';
import isHTMLElement from '../../utils/isHTMLElement';

const renderHandler = () => {
  const input = document.querySelector('input');
  if (!isHTMLElement(input)) return;
  const inputValue = input.value;
  const text = inputValue ? `"${inputValue}" 검색 결과` : '지금 인기있는 영화';
  const h2 = createElement('h2', { textContent: text });
  return h2;
};

export default renderHandler;
