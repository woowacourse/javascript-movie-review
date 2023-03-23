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
      <div>
        <fragment id="Header">${HeaderComponent({ keyword, handleKeyword })}</fragment>
        <fragment id="MovieChart">${MovieChartComponent({ keyword })}</fragment>
      </div>
    `
  );

  return [$template, $events];
});

export { App };
