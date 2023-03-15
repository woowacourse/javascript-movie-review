import { PageHeader } from './PageHeader';
import { renderMovieList } from './MovieList';
import { ViewMoreButton } from './ViewMoreButton';

export function MainPage() {
  renderMovieList();
  return `
    <section class="item-view">
        ${PageHeader()}
        <ul class="item-list">
        </ul>
        
        ${ViewMoreButton()}
    </section>
    `;
}
