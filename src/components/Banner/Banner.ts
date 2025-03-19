const $Banner = () => {
  const $backgroundContainer = createElement("div", {
    className: "background-container",
  });

  $backgroundContainer.innerHTML = `
  <div class="overlay" aria-hidden="true"></div>
  <div class="top-rated-container">
    <div class="top-rated-movie">
      <div class="rate">
        <img src="./images/star_empty.png" class="star" />
        <span class="rate-value">9.5</span>
      </div>
      <div class="title">인사이드 아웃2</div>
    </div>
  </div>`;

  return $backgroundContainer;
};

export default $Banner;
