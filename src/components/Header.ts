class Header {
  template = `
        <h1 class="logo"><img src="assets/logo.png" alt="MovieList 로고" /></h1>
        <form class="search-box">
          <input type="text" name="search-text" placeholder="검색" />
          <button class="search-button">검색</button>
        </form>`;

  render() {
    document.querySelector('header')?.insertAdjacentHTML('beforeend', this.template);
  }
}

export default Header;
