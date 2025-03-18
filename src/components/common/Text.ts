import { createElement, ElementProps } from '../../utils/createElement.ts';

type TextProps = {
  classList: string[];
  props: ElementProps;
};

export const Text = ({ classList, props }: TextProps) => {
  const textElement = createElement('p', props);
  textElement.classList.add(classList.join(' '));

  return textElement;
};
