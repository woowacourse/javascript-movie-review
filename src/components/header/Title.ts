import { resizeMobileWidth } from '../../constant/movie';
import { showElement } from '../../util/hiddenElement';
import { throttleOnRendering } from '../../util/throttling';

interface Props {
  element: HTMLElement;
  click: () => void;
}

const Title = ({ element, click }: Props) => {
  const title = document.createElement('h1');
  title.appendChild(element);

  title.addEventListener('click', click);

  window.addEventListener(
    'resize',
    throttleOnRendering(() => {
      if (window.innerWidth > resizeMobileWidth) {
        showElement(title);
      }
    }),
  );

  return title;
};

export default Title;
