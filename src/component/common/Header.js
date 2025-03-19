import SearchForm from './SearchForm'

function Header() {
  function template() {
    return `
    
     <h1 class="logo" data-action="reload">
            <img src="./images/logo.png" alt="MovieList" />
        </h1>
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
