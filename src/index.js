import './styles/reset.css';
import './styles/common.css';

import App from './App';
import modal from './components/Modal';
import stateRender from './renderer/StateRender';

new App(document.getElementById('app'));

// window.addEventListener('hashchange', () => {
//   // hashChange가 발생한다면 -> url 변화가 있다면 modal을 닫는지 아닌지 확인
//   const isModalOpen = document.querySelector('.modal--open') ? true : false;
//   const hash = location.hash;

//   if (hash === '' && isModalOpen) {
//     modal.close(true);
//     return;
//   }

//   const movieId = hash.split('/')[1];

//   // movieId가 존재한다면 -> 다시 한번 modal을 띄워줌.
//   if (movieId && !isModalOpen) {
//     modal.open();
//     stateRender.renderMovieDetail(movieId, modal.getModalContainer());
//   }
// });

// window.addEventListener('keyup', (event) => {
//   if (event.defaultPrevented) return;
//   if (event.key === 'Escape') modal.close();
// });
