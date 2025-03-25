import Footer from '../../component/Footer';
import { $ } from '../../util/selector';

export const renderFooter = () => {
  const wrap = $('#wrap');
  if (!wrap) return;

  const footer = Footer();
  wrap.appendChild(footer);
};
