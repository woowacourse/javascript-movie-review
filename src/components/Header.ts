import Button from "./Button";
import SearchBar from "./SearchBar";

function Header() {
  return /*html*/ `<header>
    <div class="background-container">
      <div class="overlay" aria-hidden="true"></div>
      <div class="top-rated-container">
        <div class="logo">
          <img class="logo-img" src="./images/logo.png" alt="MovieList" />
          ${SearchBar()}
        </div>
        <div class="top-rated-movie">
          <div class="rate">
            <img src="./images/star_empty.png" class="star" />
            <span class="rate-value">9.5</span>
          </div>
          <div class="title">인사이드 아웃2</div>
         ${Button({ text: "자세히보기" })}
        </div>
      </div>
    </div>
  </header>`;
}

export default Header;
