class MovieHeader extends HTMLElement {
  styleSheet = `
    header {
      width: 100%;
      min-width: 1200px;
      height: 72px;
      background-color: #222;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      border-bottom: 1px solid white;
      margin-bottom: 48px;
    }

    header h1 {
      cursor: pointer;
      user-select: none;
      font-size: 2rem;
      font-weight: bold;
      letter-spacing: -0.1rem;
      color: #f33f3f;
    }

    header > .search-box {
      background: #fff;
      padding: 8px;
      border-radius: 4px;
    }

    header .search-box > input {
      border: 0;
    }

    header .search-box > .search-button {
      width: 14px;
      border: 0;
      text-indent: -1000rem;
      background: url('./search_button.png') transparent no-repeat 0 1px;
      background-size: contain;
    }
  `;

  template = /* html */ `
    <header>
      <h1><img src="./logo.png" alt="MovieList 로고" /></h1>
      <div class="search-box">
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </div>
    </header>
  `;

  constructor() {
    super();
    this.innerHTML = this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>${this.styleSheet}</style>
      ${this.template}
    `;
  }

  connectedCallback() {}
}

export default MovieHeader;
