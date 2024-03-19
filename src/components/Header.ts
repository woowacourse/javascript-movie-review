/* 
Header

- UI
- Event 
1. 검색 폼을 가지고 있음 
-> 사용자가 특정 기워드를 검색할 때, 어떤 동작을 할 것인지를 외부에서 주입.

*/

import Component from "../common/Component";
import { $ } from "../utils/dom";

interface HeaderProps {
  onSearchKeywordSubmit: () => void;
  onLogoClick: () => void;
}

/* 
- h1, form에 이벤트 핸들러 등록

- DOM API를 활용해서 돔 요소 찾기

- selector => id >>> class
*/

class Header extends Component<HTMLDivElement, HeaderProps> {
  protected getTemplate() {
    return /*html*/ `
    <h1 id="logo"><img src="./logo.png" alt="MovieList 로고" /></h1>
    <div class="search-box">
      <form id="search-form">
        <input id="search-input" type="text" placeholder="검색" />
        <button id="search-button" type="submit" class="search-button">검색</button>
      </form>
    </div>
    `;
  }

  protected render() {
    if (!this.$target) return;
    this.$target.innerHTML = this.getTemplate();
  }

  protected setEvent(): void {
    if (!this.props) return;

    const { onLogoClick, onSearchKeywordSubmit } = this.props;
    console.log(this.$target.innerHTML);
    console.log($<HTMLHeadingElement>("#logo"));
    console.log(document.querySelector("h1"));

    $<HTMLHeadingElement>("#logo")?.addEventListener("click", () => {
      // e.preventDefault();
      onLogoClick();
    });

    $<HTMLFormElement>("#search-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      onSearchKeywordSubmit();
    });
  }
}

export default Header;
