export type ElementTag = keyof HTMLElementTagNameMap;

interface BasicOption {
  className?: string;
  id?: string;
}

interface DivOption extends BasicOption {}

interface ImgOption extends BasicOption {
  src: string;
  alt: string;
  loading?: 'lazy';
  onload?: (this: HTMLImageElement, ev: Event) => any;
}

interface POption extends BasicOption {
  textContent: string;
}

interface InputOption extends BasicOption {
  type: string;
  placeholder?: string;
}

export type ElementOption = DivOption | ImgOption | InputOption | POption;
