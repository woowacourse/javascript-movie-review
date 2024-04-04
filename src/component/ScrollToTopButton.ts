function renderScrollToTopButton() {
  const button = document.createElement('button');
  button.classList.add('scroll-to-top-button');
  button.textContent = '▲';

  document.body.append(button);

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

export default renderScrollToTopButton;
