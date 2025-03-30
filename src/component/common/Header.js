import SearchForm from './SearchForm.js'

function Header() {
  function template() {
    return `
        <a href="/javascript-movie-review/" class="logo">
            <img src="./images/logo.png" alt="MovieList" />
        </a>
        <div class="header-container">
            ${SearchForm()}
        </div>
    `
  }

  function render() {
    document.querySelector('header').innerHTML = template()
  }
  render()
}

export default Header
