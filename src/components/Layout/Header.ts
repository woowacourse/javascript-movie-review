import {
  DEFAULT_MOVIE_DATA,
  PREFIX_POSTER_PATH,
} from "../../constants/constants";
import Button from "../Common/Button";

interface HeaderState {
  posterImage: `http://${string}` | `https://${string}`;
  title: string;
  voteAverage: number;
  hasSearched: boolean;
}

export default class Header {
  private static instance: Header;
  private $header: HTMLElement;
  private state: HeaderState;

  private constructor() {
    this.$header = document.createElement("header");
    this.$header.className = "background-container";
    this.state = {
      posterImage: `${PREFIX_POSTER_PATH}${DEFAULT_MOVIE_DATA.posterPath}`,
      title: DEFAULT_MOVIE_DATA.title,
      voteAverage: DEFAULT_MOVIE_DATA.voteAverage,
      hasSearched: false,
    }; // TODO: default가 아니라 아예 없는 값으로 처리하고 isLoading 상태로 스켈레톤 추가
    this.render();
  }

  static getInstance(): Header {
    if (!Header.instance) Header.instance = new Header();
    return Header.instance;
  }

  render() {
    this.$header.style.backgroundImage = !this.state.hasSearched
      ? `url(${this.state.posterImage})`
      : "";

    this.$header.innerHTML = /*html*/ `
    ${
      !this.state.hasSearched
        ? /*html*/ `<div class="overlay" aria-hidden="true"></div>`
        : ""
    }
    <div class="top-rated-header">
      <a href="/javascript-movie-review">
        <h1 class="logo">
          <img src="./images/logo.png" alt="MovieList" />
        </h1>
      </a>
      <form class="top-rated-search">
        <input
          id="top-rated-search-input"
          class="top-rated-search-input"
          placeholder="검색어를 입력하세요"
        />
        <button type="submit" class="top-rated-search-button">
          <img src="./images/search.svg" alt="MovieSearch" />
        </button>
      </form>
    </div>
    ${
      !this.state.hasSearched
        ? /*html*/ `
        <div class="top-rated-container">
          <div class="top-rated-movie">
            <div class="rate">
              <img src="./images/star_empty.png" class="star" alt="star_empty" />
              <span class="rate-value">${this.state.voteAverage}</span>
            </div>
            <div class="title">${this.state.title}</div>
            ${
              Button({ className: "detail", textContent: "자세히 보기" })
                .outerHTML
            }
          </div>
        </div>`
        : ""
    }
    
  `;
  }

  setState(newState: Partial<HeaderState>) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  getElement() {
    return this.$header;
  }
}
