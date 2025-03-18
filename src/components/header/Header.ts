import { images } from "../../assets/images";
import Button from "../@common/Button";

interface HeaderProps {
  rate: number;
  title: string;
}

const Header = (props: HeaderProps) => {
  const { rate, title } = props;

  return `
    <header>
        <div class="background-container">
          <div class="overlay" aria-hidden="true">
            
          </div>
          <div class="top-rated-container">
            <h1 class="logo">
              <img src="${images.logo}" alt="MovieList" />
            </h1>
            <div class="top-rated-movie">
              <div class="rate">
                <img src="${images.starEmpty}" class="star" />
                <span class="rate-value">${rate}</span>
              </div>
              <div class="title">${title}</div>
              ${Button({
                attribute: {
                  class: "primary detail",
                },
                children: "자세히 보기",
              })}
            </div>
          </div>
        </div>
      </header>
  `;
};

export default Header;
