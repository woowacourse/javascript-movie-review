import './TopButton.css';

class TopScrollButton {
  topButtonBox;

  constructor() {
    this.topButtonBox = document.createElement('button');
    this.topButtonBox.id = 'top-button';
    this.topButtonBox.textContent = 'TOP';
    this.render();
    this.setEvent();
  }

  render() {
    const main = document.querySelector('#app');
    if (!main) return;
    main.append(this.topButtonBox);
  }

  setEvent() {
    let topButtonEvent: NodeJS.Timeout | null;

    window.addEventListener('scroll', () => {
      clearTimeout(topButtonEvent!);

      topButtonEvent = setTimeout(() => {
        if (window.scrollY > 200) {
          this.topButtonBox.classList.add('show');
        } else {
          this.topButtonBox.classList.remove('show');
        }
      }, 1000);
    });

    this.topButtonBox.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

export default TopScrollButton;
