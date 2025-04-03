import { getHTML } from '../../util/utils'
import SearchForm from './SearchForm'

function Header() {
  function template() {
    return `
        <div class="header-container">
        <a href="/javascript-movie-review/" class="header-logo">
            <img src="./images/logo.png" alt="MovieList" />
        </a>
            <div id="headerSearchBox" class="header-search-box"></div>
            <img src="./images/logo.png" alt="MovieList" class="header-transparent-logo" />
        </div>
        <div id="headerBackground" class="header-background">
        </div>
    `
  }

  function render() {
    getHTML('headerSection').innerHTML = template()
  }
  render()
}

export default Header
