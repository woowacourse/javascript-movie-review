interface Props {
  element: HTMLElement;
  onClick: () => void;
}

const Title = ({ element, onClick }: Props) => {
  const title = document.createElement('h1');

  title.classList.add('title');

  title.appendChild(element);

  title.addEventListener('click', () => onClick());

  return title;
};

export default Title;
