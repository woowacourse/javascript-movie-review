import Header from './Header/Header';

function App() {
  return {
    render: () => {
      const $app = document.querySelector('#app');
      $app?.appendChild(Header().render());
    },
  };
}

export default App;
