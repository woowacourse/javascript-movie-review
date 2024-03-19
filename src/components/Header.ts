/* 
<header>
    <h1><img src="./logo.png" alt="MovieList 로고" /></h1>
    <div class="search-box">
    <input type="text" placeholder="검색" />
    <button class="search-button">검색</button>
    </div>
</header>
*/

/* 
Header

- UI
- Event 
1. 검색 폼을 가지고 있음 
-> 사용자가 특정 기워드를 검색할 때, 어떤 동작을 할 것인지를 외부에서 주입.

*/

import Component from "../common/Component";

interface HeaderProps {
  onSearchKeywordSubmit: () => void;
  onLogoClick: () => void;
}

class Header extends Component<HeaderProps> {
  protected getTemplate() {
    return /*html*/ `
    <h1><img src="./logo.png" alt="MovieList 로고" /></h1>
    <div class="search-box">
      <input type="text" placeholder="검색" />
      <button class="search-button">검색</button>
    </div>
    `;
  }

  render() 
    if (!this.$target) return;
    this.$target.innerHTML = this.getTemplate();
  }
}

export default Header;
