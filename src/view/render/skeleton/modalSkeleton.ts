import createDOMElement from '../../../util/createDomElement';
import { $, $all } from '../../../util/selector';

const loadingSpinner = () => {
  return createDOMElement({
    tag: 'div',
    className: 'orbit-spinner',
    children: [
      createDOMElement({
        tag: 'div',
        className: 'planet'
      }),
      createDOMElement({
        tag: 'div',
        className: 'orbit',
        children: [
          createDOMElement({
            tag: 'div',
            className: 'satellite satellite-1'
          }),
          createDOMElement({
            tag: 'div',
            className: 'satellite satellite-2'
          })
        ]
      })
    ]
  });
};

export const modalSkeletons = () => {
  const header = $('#wrap') as HTMLElement;
  if (!header) return;

  const fragment = document.createDocumentFragment();
  fragment.appendChild(
    createDOMElement({
      tag: 'div',
      className: 'modal-skeleton',
      children: [
        loadingSpinner(),
        createDOMElement({
          tag: 'div',
          className: 'skeleton_loading--dark',
          children: [
            createDOMElement({
              tag: 'div',
              className: 'skeleton_img'
            })
          ]
        })
      ]
    })
  );

  header.prepend(fragment);
};

export const hideModalSkeletons = () => {
  const skeletons = $all('.modal-skeleton');

  skeletons.forEach((skeleton) => {
    skeleton.remove();
  });
};
