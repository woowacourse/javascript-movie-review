interface Props {
  element: HTMLElement;
}

const Title = ({ element }: Props) => {
  const title = document.createElement('h1');
  title.appendChild(element);

  return title;
};

export default Title;
