import { assemble, Event } from '../../core';
import { getElement } from './../../utils/common/domHelper';
import { HeaderComponent, MovieChartComponent } from './actions';

const App = assemble(() => {
  const $events: Event[] = [];
  const $template = getElement(
    ` 
      <div>
        <fragment id="Header">${HeaderComponent()}</fragment>
        <fragment id="MovieChart">${MovieChartComponent()}</fragment>
      </div>
    `
  );

  return [$template, $events];
});

export { App };
