export function createHeader() {
  const header = render();
  return header;
}

function render() {
  const header = document.createElement('header');

  const logo = document.createElement('h1');
  const logoImage = document.createElement('img');
  logoImage.src = './logo.png';
  logoImage.alt = 'MovieList 로고';
  logo.appendChild(logoImage);

  const searchBox = document.createElement('form');
  const searchInput = document.createElement('input');
  searchInput.placeholder = '검색';

  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.className = 'search-button';
  searchButton.textContent = '검색';
  searchBox.append(searchInput, searchButton);

  header.append(logo, searchBox);

  return header;
}
