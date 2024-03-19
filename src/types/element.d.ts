type ElemetTag = 'header' | 'p' | 'div' | 'span' | 'h1' | 'img' | 'input' | 'button';

export type ElementProps = {
  tag: ElemetTag;
  props: Partial<ElementOptionProps>;
};

interface BasicOption {
  className?: string;
  id?: string;
}

export interface DivOption extends BasicOption {}

export interface ImgOption extends BasicOption {
  src: string;
  alt: string;
}

export interface InputOption extends BasicOption {
  type: string;
  placeholder?: string;
}

export type ElementOption = DivOption | ImgOption | InputOption;
