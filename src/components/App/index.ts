import { assemble, Event, useState } from '../../core';
import { getElement } from './../../utils/common/domHelper';
import { HeaderComponent, MovieChartComponent } from './actions';

const App = assemble(() => {
  const [keyword, setKeyword] = useState<string>('');
  const $events: Event[] = [];

  const handleKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const $template = getElement(
    ` 
      <div class="app-container">
        <fragment id="Header">${HeaderComponent({ handleKeyword })}</fragment>
        <fragment id="MovieChart">${MovieChartComponent({ keyword })}</fragment>
        <div class='fetch-more-line'></div>    
      </div>
    `
  );

  return [$template, $events];
});

export { App };
