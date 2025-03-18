type HeaderProps = {
  navigationBar: HTMLDivElement;
};

const Header = ({ navigationBar }: HeaderProps) => {
  const header = document.createElement("header");

  header.innerHTML = `
  <div class="background-container">
    <div class="overlay" aria-hidden="true"></div>
    <div class="top-rated-container">
      
      <div class="top-rated-movie">
        <div class="rate">
          <img src="images/star_empty.png" class="star" />
          <span class="rate-value">9.5</span>
        </div>
        <div class="title">인사이드 아웃2</div>
        <button class="primary detail">자세히 보기</button>
      </div>
    </div>
  </div>
`;

  const topRatedContainer = header.querySelector(".top-rated-container");
  if (topRatedContainer) {
    topRatedContainer.prepend(navigationBar);
  }

  return header;
};

export default Header;
