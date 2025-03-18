import { Movie } from "../main";
import { IMAGE_BASE_URL } from "./MovieList";
import SearchBar from "./SearchBar";
interface Props {
  topRatedMovie: Movie;
}
class Header {
  #parentElement;
  #props;
  constructor(parentElement: HTMLElement, props: Props) {
    this.#parentElement = parentElement;
    this.#props = props;
    this.#render();
  }

  #render() {
    this.#parentElement.innerHTML = /*html*/ `
    <div class="background-container" style="background-image: url(${IMAGE_BASE_URL}${
      this.#props.topRatedMovie.poster_path
    })">
        <div class="overlay" aria-hidden="true"></div>
        <div class="top-rated-container">
            <h1 class="logo">
                <img src="./images/logo.png" alt="MovieList" />
            </h1>
            ${SearchBar()}
            <div class="top-rated-movie">
                <div class="rate">
                <img src="./images/star_empty.png" class="star" />
                <span class="rate-value">${
                  this.#props.topRatedMovie.vote_average
                }</span>
                </div>
                <div class="title">${this.#props.topRatedMovie.title}</div>
                <button class="primary detail">자세히 보기</button>
            </div>
        </div>
    </div>
`;
  }
}

export default Header;
