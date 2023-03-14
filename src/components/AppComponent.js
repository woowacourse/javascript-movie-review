import CustomComponent from "../abstracts/CustomComponent";
import HeaderComponent from "./AppHeaderComponent";
import MovieListComponent from './MovieListComponent';
import MoreButtonComponent from "./MoreButtonComponent";
import ListTitleComponent from "./ListTitleComponent";

export default class AppComponent extends CustomComponent {
    template() {
        return `
        <div id="app">
            <app-header></app-header>
        <main>
          <section class="item-view">
            <list-title></list-title>
            <movie-list></movie-list>
            <more-button></more-button>
          </section>
        </main>
      </div>
        `
    }
 }
customElements.define("app-component", AppComponent);
