import { $ } from '../utils/dom';

class Main {
  static render() {
    const container = $<HTMLDivElement>('#app');

    if (container instanceof HTMLDivElement) {
      container.insertAdjacentHTML('beforeend', '<main></main>');
    }
  }
}

export default Main;
