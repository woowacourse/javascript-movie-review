import CustomComponent from '../abstracts/CustomComponent';
import MovieComponent from './MovieComponent';

export default class MovieListComponent extends CustomComponent {
    template() {
        return `
            <ul class="item-list">
                <movie-item></movie-item>
            </ul>
        `
    }
}
customElements.define("movie-list", MovieListComponent);
