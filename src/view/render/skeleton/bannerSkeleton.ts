import createDOMElement from '../../../util/createDomElement';
import { $, $all } from '../../../util/selector';

export const bannerSkeletons = () => {
  const header = $('#wrap') as HTMLElement;
  if (!header) return;

  const fragment = document.createDocumentFragment();
  fragment.appendChild(
    createDOMElement({
      tag: 'div',
      className: 'banner-skeleton',
      children: [
        createDOMElement({
          tag: 'div',
          className: 'skeleton_loading',
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

export const hideBannerSkeletons = () => {
  const skeletons = $all('.banner-skeleton');

  skeletons.forEach((skeleton) => {
    skeleton.remove();
  });
};
