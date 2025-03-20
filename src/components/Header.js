import LogoSearchBar from "./LogoSearchBar";

function Header({ title, poster_path, vote_average }) {
  const $header = document.createElement("header");

  $header.innerHTML = `
  <div class="background-container">
    <div class="overlay" aria-hidden="true">  
    </div>
    <img src="https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${poster_path}" class="banner"/>
    <div class="top-rated-container">
    <div class="top-rated-movie">
      <div class="rate">
        <img src="./star_empty.png" class="star" />
        <span class="rate-value">${vote_average.toFixed(1)}</span>
      </div>
      <div class="title">${title}</div>
      <button class="primary detail">자세히 보기</button>
    </div>
  </div>
</div>
`;

  return $header;
}

export default Header;
