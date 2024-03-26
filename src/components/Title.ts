interface Props {
  element: HTMLElement;
  click: () => void;
}

const Title = ({ element, click }: Props) => {
  const title = document.createElement('h1');
  title.appendChild(element);

  title.addEventListener('click', click);

  return title;
};

export default Title;
