import logoPng from '../../images/logo.png';

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
      document.querySelector('header h1')?.classList.remove('clicked-logo');
      document.querySelector('header > .search-box')?.classList.remove('clicked-form');
      document.querySelector('header .search-box > input')?.classList.remove('clicked-form');
      document.querySelector('header')?.classList.remove('clicked-header');
    }
    if (width < 768 && (document.querySelector('header .search-box > input') as HTMLInputElement)?.value !== '') {
      document.querySelector('header h1')?.classList.add('clicked-logo');
      document.querySelector('header > .search-box')?.classList.add('clicked-form');
      document.querySelector('header .search-box > input')?.classList.add('clicked-input');
      document.querySelector('header')?.classList.add('clicked-header');
    }
  }, 100);
}
