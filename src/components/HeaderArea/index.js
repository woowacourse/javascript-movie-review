import Banner from "./Banner";
import Header from "./Header";

const HeaderArea = () => {
  return /* html */ `
    <header>
      <div class="background-container">
        <div class="overlay" aria-hidden="true"></div>
        <div class="top-rated-container">
          ${Header()}
          ${Banner()}
        </div>
      </div>
    </header>
  `;
};

export default HeaderArea;
