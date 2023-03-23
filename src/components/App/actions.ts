import { absorb } from '../../core';
import { Header, HeaderProps } from '../Header';
import { MovieChart, MovieChartProps } from '../MovieChart';

const AppActions = () => {
  const HeaderComponent = (props: HeaderProps) => {
    absorb('#Header', Header(props));
  };

  const MovieChartComponent = (props: MovieChartProps) => {
    absorb('#MovieChart', MovieChart(props));
  };

  return { HeaderComponent, MovieChartComponent };
};

export const { HeaderComponent, MovieChartComponent } = AppActions();
