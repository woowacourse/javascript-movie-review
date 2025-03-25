import Header from '../../component/Header';
import { $ } from '../../util/selector';

export const renderHeader = () => {
  const wrap = $('#wrap');

  const header = Header();
  wrap?.prepend(header);
};
