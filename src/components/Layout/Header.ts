import Component from "../base/Component";
import Button from "../common/Button";
import Skeleton from "../common/Skeleton";

interface HeaderState {
  id: number | null;
  posterImage: `http://${string}` | `https://${string}` | null;
  title: string | null;
  voteAverage: number | null;
  hasSearched: boolean;
  isLoading: boolean;
}

export default class Header extends Component<HeaderState> {
  private static instance: Header;

  protected constructor() {
    super({
      id: null,
      posterImage: null,
      title: null,
      voteAverage: null,
      hasSearched: false,
      isLoading: true,
    });
  }

  protected createElement(): HTMLElement {
    const $header = document.createElement("header");
    $header.className = "background-container";
    return $header;
  }

  static getInstance(): Header {
    if (!Header.instance) Header.instance = new Header();
    return Header.instance;
  }

  render() {
    this.$element.style.backgroundImage = !this.state.hasSearched
      ? `url(${this.state.posterImage})`
      : "";

    super.render();
  }

  private renderSkeletonItem() {
    return /*html*/ `
      ${Skeleton({ width: 100, height: 20 }).outerHTML}
      ${Skeleton({ width: 170, height: 30 }).outerHTML}
      ${Skeleton({ width: 120, height: 20 }).outerHTML}
    `;
  }

  protected template(): string {
    return /*html*/ `
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
          <div class="top-rated-movie"  data-movie-id="${this.state.id}">
            ${
              this.state.isLoading
                ? this.renderSkeletonItem()
                : /*html*/ `
                  <div class="rate">
                    <img src="./images/star_empty.png" class="star" alt="star_empty" />
                    <span class="rate-value">${this.state.voteAverage}</span>
                  </div>
                  <div class="title">${this.state.title}</div>
                  ${
                    Button({ className: "detail", textContent: "자세히 보기" })
                      .outerHTML
                  }
                `
            }
          </div>
        </div>`
        : ""
    }
  `;
  }
}
