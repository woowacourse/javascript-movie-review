import logoPng from '../../images/logo.png';
import { Dom } from '../../utils/Dom';

export function createHeader(logoHandler: () => void, inputSubmitHandler: (inputValue: string) => void) {
  const header = render(logoHandler, inputSubmitHandler);
  return header;
}

function render(logoHandler: () => void, inputSubmitHandler: (inputValue: string) => void) {
  const header = document.createElement('header');

  const logo = document.createElement('h1');
  const logoImage = document.createElement('img');
  logoImage.src = logoPng;
  logoImage.alt = 'MovieList 로고';
  logo.appendChild(logoImage);

  const searchBox = document.createElement('form');
  searchBox.className = 'search-box';

  const searchInput = document.createElement('input');
  searchInput.placeholder = '검색';

  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.className = 'search-button';
  searchButton.textContent = '검색';

  searchBox.append(searchInput, searchButton);

  header.append(logo, searchBox);
  window.addEventListener('resize', handleResize);
  logo.addEventListener('click', () => {
    logoHandler();
  });

  searchBox.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    inputSubmitHandler(searchInput.value);
  });

  return header;
}

let debounce: NodeJS.Timeout | undefined;
function handleResize() {
  if (debounce) clearTimeout(debounce);

  debounce = setTimeout(() => {
    const width = window.innerWidth;
    if (width >= 768) {
      noneClickedHeaderView();
    }
    if (width < 768 && (Dom.getElement(document, 'header .search-box > input') as HTMLInputElement)?.value !== '') {
      clickedHeaderView();
    }
  }, 100);
}

export function noneClickedHeaderView() {
  Dom.getElement(document, 'header h1').classList.remove('clicked-logo');
  Dom.getElement(document, 'header > .search-box').classList.remove('clicked-form');
  Dom.getElement(document, 'header .search-box > input').classList.remove('clicked-input');
  Dom.getElement(document, 'header')?.classList.remove('clicked-header');
}
export function clickedHeaderView() {
  Dom.getElement(document, 'header h1').classList.add('clicked-logo');
  Dom.getElement(document, 'header > .search-box').classList.add('clicked-form');
  Dom.getElement(document, 'header .search-box > input').classList.add('clicked-input');
  Dom.getElement(document, 'header').classList.add('clicked-header');
}
