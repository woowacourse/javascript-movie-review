import SearchForm from "./SearchForm"

function Header(){
    function template() {
    return `
    <div class="header-container">
        <h1 class="logo">
            <img src="./images/logo.png" alt="MovieList" />
        </h1>
        <div class="top-rated-container">
            ${SearchForm()}
        </div>
    </div>
    `}

    function render() {
        document.querySelector('header').innerHTML = template();
    }
    render();
}

export default Header;