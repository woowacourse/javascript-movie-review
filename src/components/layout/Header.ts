import { createElement } from "../../utils/createElement.ts";
import { $ } from "../../utils/dom.ts";
import Button from "../common/Button.ts";
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
            
          </div>
      </div>
    </header>
  `);

  const rate = Rate({ rate: 10 });
  const button = Button({text:"자세히 보기",className:["primary","detail"]})
  if (!rate) return;

  const topRateMovie =  $(".top-rated-movie", header)
  topRateMovie.prepend(rate);
  topRateMovie.appendChild(button);

  return header;
};

export default Header;
