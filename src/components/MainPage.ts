import { MovieList } from './MovieList';
import { PageTitle } from './PageTitle';
import { ViewMoreButton } from './ViewMoreButton';

import { publisher } from '../store/publisher';

export function MainPage(state: publisher) {
  return `
    <section class="item-view">
        ${PageTitle()}
        ${MovieList()}
        ${ViewMoreButton(state)}
    </section>
    `;
}
