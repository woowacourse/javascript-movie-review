import logoImg from '../assets/images/logo.png';

function getHeader() {
  const headerTag = document.createElement('header');
  headerTag.innerHTML = `
    <h1><img src=${logoImg} alt="MovieList 로고" /></h1>
    <div class="search-box">
      <input type="text" placeholder="검색" />
      <button class="search-button">검색</button>
    </div>
  `;
  return headerTag;
}

export default getHeader;
