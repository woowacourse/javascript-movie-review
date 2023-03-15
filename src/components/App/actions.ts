import { $, replaceComponent } from '../../utils/common/domHelper';
import { Header } from '../Header';
import { debounce } from './../../utils/common/debounce';

const AppActions = () => {
  const HeaderComponent = (props?: any) => {
    return (
      debounce(() => {
        replaceComponent($('#Header'), Header(props));
      })() && ''
    );
  };

  return { HeaderComponent };
};

export const { HeaderComponent } = AppActions();
