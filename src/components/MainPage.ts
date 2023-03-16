import { PageHeader } from './PageHeader';
import { renderPopularMovieList } from './MovieList';
import { ViewMoreButton } from './ViewMoreButton';

export function MainPage() {
  return `
    <section class="item-view">
        ${PageHeader()}
        <ul class="item-list">
        </ul>
        ${ViewMoreButton()}
    </section>
    `;
}
