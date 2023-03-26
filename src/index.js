import './styles/reset.css';
import './styles/common.css';

import App from './App';
import modal from './components/Modal';

new App(document.getElementById('app'));

window.addEventListener('keyup', (event) => {
  if (event.defaultPrevented) return;
  if (event.key === 'Escape') modal.close();
});
