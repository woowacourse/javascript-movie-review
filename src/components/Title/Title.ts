interface Props {
  element: HTMLElement;
}

const handleHomeButtonClick = (event: MouseEvent) => {
  event.target?.dispatchEvent(
    new CustomEvent('home-click', {
      bubbles: true,
    }),
  );
};

const Title = ({ element }: Props) => {
  const title = document.createElement('h1');

  title.classList.add('title');

  title.appendChild(element);

  title.addEventListener('click', (event) => {
    handleHomeButtonClick(event);
  });

  return title;
};

export default Title;
