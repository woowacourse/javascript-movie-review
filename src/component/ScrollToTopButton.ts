function renderScrollToTopButton() {
  const button = document.createElement('button');
  button.classList.add('scroll-to-top-button', 'none-display');
  button.textContent = '▲';

  document.body.prepend(button);

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.onscroll = function () {
    scrollFunction();
  };

  // 스크롤을 내리면 버튼이 표시되는 로직
  function scrollFunction() {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
      button.classList.remove('none-display');
    } else {
      button.classList.add('none-display');
    }
  }
}

export default renderScrollToTopButton;
