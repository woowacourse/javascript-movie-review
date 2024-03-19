import { ElementOption, ElemetTag } from '../types/element';

const createElement = (tag: ElemetTag, props: ElementOption = {}) => {
  const targetTag = document.createElement(tag);

  Object.entries(props).forEach(([key, value]) => {
    if (value) {
      targetTag.setAttribute(key, value);
    }
  });

  return targetTag;
};

export default createElement;
