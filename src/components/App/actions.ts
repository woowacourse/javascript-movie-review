import { $, replaceComponent } from '../../utils/common/domHelper';
import { Header, HeaderProps } from '../Header';
import { MovieChart } from '../MovieChart';
import { debounce } from './../../utils/common/debounce';
import { setComponentList } from '../../core';

const AppActions = () => {
  const HeaderComponent = (props: HeaderProps) => {
    setComponentList('#Header', Header(props));

    return '';
    return (
      debounce(() => {
        replaceComponent($('#Header'), Header(props));
      })() && ''
    );
  };

  const MovieChartComponent = (props: MovieChart) => {
    setComponentList('#MovieChart', MovieChart(props));

    return '';
    return (
      debounce(() => {
        replaceComponent($('#MovieChart'), MovieChart(props));
      })() && ''
    );
  };

  return { HeaderComponent, MovieChartComponent };
};

export const { HeaderComponent, MovieChartComponent } = AppActions();
