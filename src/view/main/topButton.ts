/* eslint-disable max-lines-per-function */
function scrollTopHandler() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function buttonHideStyle() {
  window.addEventListener('scroll', () => {
    const button = document.querySelector('.topScrollButton') as HTMLButtonElement;
    if (window.scrollY === 0 && !button.classList.contains('hidden')) {
      button.classList.add('hidden');
    }
    if (window.scrollY !== 0 && button.classList.contains('hidden')) {
      button.classList.remove('hidden');
    }
  });
}

function renderTopButton() {
  const button = document.createElement('button');
  button.onclick = scrollTopHandler;
  button.className = 'topScrollButton flex-XY-aligned hidden';
  button.innerText = '🆙';
  const main = document.querySelector('main') as HTMLElement;
  main.append(button);
  buttonHideStyle();
}

export default renderTopButton;
