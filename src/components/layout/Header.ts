import { createElement } from "../../utils/createElement.ts";
import { $ } from "../../utils/dom.ts";
import Rate from "../common/Rate.ts";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const header = createElement(/*html*/ `
    <header>
      <div class="background-container">
        <div class="overlay" aria-hidden="true"></div>
        <div class="top-rated-container">
          <h1 class="logo">
            <img src="./images/logo.png" alt="MovieList" />
          </h1>
          <div class="top-rated-movie">
            <div class="title">${title}</div>
            <button class="primary detail">자세히 보기</button>
          </div>
      </div>
    </header>
  `);

  const rate = Rate({ size: 32, rate: 10 });
  if (!rate) return;

 $(".top-rated-movie", header).appendChild(rate);

  return header;
};

export default Header;
