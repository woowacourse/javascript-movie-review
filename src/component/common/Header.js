import SearchForm from './SearchForm.js'
import { getElement } from '../../util/utils.js'

function Header() {
  function template() {
    return `
    
     <h1 class="logo">
            <img src="./images/logo.png" alt="MovieList" />
        </h1>
    <div class="header-container">

            ${SearchForm()}
    </div>
    `
  }

  function render() {
    getElement('header').innerHTML = template()
  }
  render()
}

export default Header
