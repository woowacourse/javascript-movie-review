import { MovieList } from './MovieList';
import { PageHeader } from './PageHeader';
import { ViewMoreButton } from './ViewMoreButton';

export function MainPage() {
  return `
    <section class="item-view">
        ${PageHeader()}
        ${MovieList()}
        ${ViewMoreButton()}
    </section>
    `;
}
