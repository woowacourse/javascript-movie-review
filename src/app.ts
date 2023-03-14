import Header from './components/Header';

class App {
  constructor() {
    this.initEventHandler();
  }

  initLoad() {
    const header = new Header();
    const app = document.querySelector('#app');

    if (!app) return;

    app.insertAdjacentElement('afterbegin', header.node);
  }

  initEventHandler() {
    window.addEventListener('load', this.initLoad);
  }
}

export default App;
