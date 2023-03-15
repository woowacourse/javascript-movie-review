import { MovieList } from './MovieList';
import { PageTitle } from './PageTitle';
import { ViewMoreButton } from './ViewMoreButton';

export function MainPage() {
  return `
    <section class="item-view">
        ${PageTitle()}
        ${MovieList()}
        ${ViewMoreButton()}
    </section>
    `;
}
