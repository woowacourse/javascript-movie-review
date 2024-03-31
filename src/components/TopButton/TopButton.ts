import './TopButton.css';

class TopButton {
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
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        this.topButtonBox.classList.add('show');
      } else {
        this.topButtonBox.classList.remove('show');
      }
    });

    this.topButtonBox.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

export default TopButton;
