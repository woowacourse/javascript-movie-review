import './style.css';

interface Props {
  imageSource: string;
}

// eslint-disable-next-line max-lines-per-function
const createHeader = ({ imageSource }: Props) => {
  const header = document.createElement('header');
  const templates =
    /* html */
    `
      <h1><img src=${imageSource} alt="MovieList 로고" /></h1>
      <div class="search-box">
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </div>
    `;
  header.innerHTML = templates;
  return header;
};

export default createHeader;
