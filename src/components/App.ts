import Header from './Header/Header';
import Main from './Main/Main';

function App() {
  return {
    render: () => {
      const $app = document.querySelector('#app');
      $app?.appendChild(Header().render());
      $app?.appendChild(Main().render());
    },
  };
}

export default App;
