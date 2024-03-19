import Button from './Button';

const MovieItems = {
  createElements() {
    const main = document.createElement('main');
    main.classList.add('item-view');
    const h2 = document.createElement('h2');
    h2.textContent = '지금 인기 있는 영화';
    const ul = document.createElement('ul');
    ul.classList.add('item-list');

    h2.appendChild(ul);
    main.appendChild(h2);

    const button = Button.createElements({
      className: ['btn', 'primary', 'full-width'],
      text: '더 보기',
      onClick: this.handleOnClick,
    });
    main.appendChild(button);

    return main;
  },

  handleOnClick() {
    console.log('!');
  },
};

export default MovieItems;
