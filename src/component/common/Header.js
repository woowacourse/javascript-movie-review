import SearchForm from './SearchForm.js'

function Header() {
  function template() {
    return `
        <div class="header-container">
        <a href="/javascript-movie-review/" class="header-logo">
            <img src="./images/logo.png" alt="MovieList" />
        </a>
            ${SearchForm()}
            <img src="./images/logo.png" alt="MovieList" class="header-transparent-logo" />
        </div>
        <div id="headerBackground" class="header-background">
        </div>
    `
  }

  function render() {
    document.querySelector('#headerSection').innerHTML = template()
  }
  render()
}

export default Header
