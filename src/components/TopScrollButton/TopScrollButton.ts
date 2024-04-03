import { throttling } from '../../utils/throttling';
import './TopScrollButton.css';

class TopScrollButton {
  topButtonBox;

  constructor() {
    this.topButtonBox = document.createElement('button');
    this.topButtonBox.id = 'top-scroll-button';
    this.topButtonBox.textContent = 'TOP';
    this.render();
    this.setEvent();
  }

  render() {
    const main = document.querySelector('#app');
    if (!main) return;
    main.append(this.topButtonBox);
  }

  scrollEvent() {
    if (window.scrollY > 500) {
      this.topButtonBox.classList.add('show');
    } else {
      this.topButtonBox.classList.remove('show');
    }
  }

  setEvent() {
    window.addEventListener(
      'scroll',
      throttling({
        fn: this.scrollEvent.bind(this),
        duration: 3000,
      }),
    );

    this.topButtonBox.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

export default TopScrollButton;
