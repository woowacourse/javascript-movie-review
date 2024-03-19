interface Props {
  title: HTMLElement;
}

const Header = ({ title }: Props) => {
  const header = document.createElement('header');

  const searchBox = document.createElement('div');
  const searchInput = document.createElement('input');
  const searchButton = document.createElement('button');

  searchBox.classList.add('search-box');
  searchButton.classList.add('search-button');

  searchInput.type = 'text';
  searchInput.placeholder = '검색';
  searchButton.textContent = '검색';

  searchBox.appendChild(searchInput);
  searchBox.appendChild(searchButton);

  header.appendChild(title);
  header.appendChild(searchBox);

  return header;
};

export default Header;
