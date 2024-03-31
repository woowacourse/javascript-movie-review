import Modal from './common/modal/Modal';
import Header from './Header/Header';
import Main from './Main/Main';

function App() {
  return {
    render: () => {
      const $app = document.querySelector('#app');
      if ($app) {
        $app.appendChild(Header().render());
        $app.appendChild(Main().render());
        $app.appendChild(Modal().render());
      }
    },
  };
}

export default App;
