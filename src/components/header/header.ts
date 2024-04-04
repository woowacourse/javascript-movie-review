import logoPng from '../../images/logo.png';

interface Props {
  onLogoClick?: () => void;
  inputSubmitHandle?: (value: string) => void | undefined;
}

const Header = ({ onLogoClick, inputSubmitHandle }: Props) => {
  const render = () => {
    const header = document.createElement('header');
    header.className = 'header';

    const logo = document.createElement('h1');
    logo.className = 'logo';
    const logoImage = document.createElement('img');
    logoImage.src = logoPng;
    logoImage.alt = 'MovieList 로고';
    logo.appendChild(logoImage);

    const searchBox = document.createElement('form');
    searchBox.className = 'search-box hidden';

    const searchInput = document.createElement('input');
    searchInput.className = 'search-input hidden';
    searchInput.placeholder = '검색';

    const searchButton = document.createElement('button');
    searchButton.type = 'submit';
    searchButton.className = 'search-button';
    searchButton.textContent = '검색';

    searchBox.append(searchInput, searchButton);

    header.append(logo, searchBox);

    header.onclick = event => {
      if ((event.target as HTMLElement).tagName === 'HEADER') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (onLogoClick) {
      logo.addEventListener('click', () => {
        searchInput.value = '';
        onLogoClick();
      });
    }

    window.addEventListener('resize', () => {
      const screenWidth = window.innerWidth;

      if (inputSubmitHandle) {
        searchBox.addEventListener('submit', event => {
          event.preventDefault();

          const isSearchInputClosed = searchInput.classList.contains('hidden');
          const searchInputValue = searchInput.value.trim();

          if (screenWidth <= 767) {
            if (isSearchInputClosed || searchInputValue === '') {
              toggleElementsVisibility(!isSearchInputClosed);
            } else {
              inputSubmitHandle(searchInputValue);
              toggleElementsVisibility(true);
            }
          } else if (searchInputValue !== '') {
            inputSubmitHandle(searchInputValue);
          }
        });
      }
    });

    const toggleElementsVisibility = (isSearchClosed: boolean) => {
      searchInput.classList.toggle('hidden', isSearchClosed);
      logo.classList.toggle('hidden', !isSearchClosed);
    };

    window.dispatchEvent(new Event('resize'));

    return header;
  };

  return render();
};

export default Header;
