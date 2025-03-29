import createDOMElement from '../../util/createDomElement';
import { $all } from '../../util/selector';

export const renderSkeletons = () => {
  const fragment = document.createDocumentFragment();
  Array.from({ length: 20 }, () => {
    fragment.appendChild(
      createDOMElement({
        tag: 'li',
        className: 'movie-skeleton',
        children: [
          createDOMElement({
            tag: 'div',
            className: 'movie-skeleton-image',
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
          }),
          createDOMElement({
            tag: 'div',
            className: 'movie-skeleton-info',
            children: [
              createDOMElement({
                tag: 'p',
                className: 'movie-skeleton-rate',
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
              }),
              createDOMElement({
                tag: 'strong',
                className: 'movie-skeleton-title',
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
            ]
          })
        ]
      })
    );
  });

  return fragment;
};

export const hideSkeletons = () => {
  const skeletons = $all('.movie-skeleton');

  skeletons.forEach((skeleton) => {
    skeleton.remove();
  });
};
