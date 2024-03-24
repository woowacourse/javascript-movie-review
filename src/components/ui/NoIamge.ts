import createElement from '../../utils/createElement';

const NoImage = () => {
  const noImageComponent = renderHandler();

  return noImageComponent;
};

const TEXT = {
  title: 'NO IMAGE',
  subtitle: 'COMING SOON',
};

const createText = () => {
  const fragment = document.createDocumentFragment();
  Object.entries(TEXT).forEach(([key, value]) => {
    fragment.appendChild(
      createElement('div', {
        className: `no-image-${key}`,
        textContent: value,
      }),
    );
  });
  return fragment;
};

const renderHandler = () => {
  const div = createElement('div', {
    className: 'no-image-container',
  });

  div.appendChild(createText());

  return div;
};

export default NoImage;
