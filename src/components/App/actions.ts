import { $, replaceComponent } from '../../utils/common/domHelper';
import { Header } from '../Header';
import { MovieChart } from '../MovieChart';
import { debounce } from './../../utils/common/debounce';

const AppActions = () => {
  const HeaderComponent = (props?: any) => {
    return (
      debounce(() => {
        replaceComponent($('#Header'), Header(props));
      })() && ''
    );
  };

  const MovieChartComponent = (props?: any) => {
    return (
      debounce(() => {
        replaceComponent($('#MovieChart'), MovieChart(props));
      })() && ''
    );
  };

  return { HeaderComponent, MovieChartComponent };
};

export const { HeaderComponent, MovieChartComponent } = AppActions();
