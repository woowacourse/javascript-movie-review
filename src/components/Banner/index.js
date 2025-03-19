const Banner = ({ vote_average, title }) => {
  return /* html */ `
    <div class="background-container">
      <div class="overlay" aria-hidden="true" ></div>
      <div class="top-rated-container">
        <div class="top-rated-movie">
          <div class="rate">
            <img src="./images/star_empty.png" class="star" />
            <span class="rate-value">${vote_average}</span>
          </div>
          <div class="title">${title}</div>
          <button class="primary detail">자세히 보기</button>
        </div>
      </div>
    </div>
  `;
};

export default Banner;
