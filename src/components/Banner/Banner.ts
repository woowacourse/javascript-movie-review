export const removeBanner = () => {
  const $header = document.querySelector("header") as HTMLElement;
  $header.classList.remove("banner-open");

  const $banner = document.querySelector(".background-container");
  $banner?.remove();
};

export const addBanner = () => {
  const $header = document.querySelector("header") as HTMLElement;
  $header.classList.add("banner-open");
  $header.prepend($Banner());
};

const $Banner = () => {
  const $backgroundContainer = createElement("div", {
    className: "background-container",
  });

  $backgroundContainer.innerHTML = `
  <div class="overlay" aria-hidden="true"></div>
  <div class="top-rated-container">
    <div class="rate">
      <img src="./star_empty.png" class="star" />
      <span class="rate-value">9.5</span>
    </div>
    <div class="title">인사이드 아웃2</div>
  </div>`;

  return $backgroundContainer;
};

export default $Banner;
