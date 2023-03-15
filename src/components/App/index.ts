import { assemble, Event } from '../../core';
import { getElement } from './../../utils/common/domHelper';
import { HeaderComponent } from './actions';

const App = assemble(() => {
  const $events: Event[] = [];
  const $template = getElement(`
    <fragment id="Header">
      ${HeaderComponent()}
    </fragment>
  `);

  return [$template, $events];
});

export { App };
