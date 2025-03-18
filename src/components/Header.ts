const Header = () => {
  return /*html*/ `
    <header>
        <div class="background-container">
            <div class="overlay" aria-hidden="true"></div>
            <div class="top-rated-container">
            <h1 class="logo">
                <img src="./images/logo.png" alt="MovieList" />
            </h1>
            <div class="top-rated-movie">
                <div class="rate">
                <img src="./images/star_empty.png" class="star" />
                <span class="rate-value">9.5</span>
                </div>
                <div class="title">인사이드 아웃2</div>
                <button class="primary detail">자세히 보기</button>
            </div>
            </div>
        </div>
    </header>
  `;
};

export default Header;
