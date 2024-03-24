interface ImageProps {
  src: string;
  alt?: string;
  classname?: string[];
  onImageClick?: () => void;
}

class Image {
  private template: HTMLImageElement;

  constructor({ src, alt, classname, onImageClick }: ImageProps) {
    const img = document.createElement('img');
    img.src = src;
    if (typeof alt !== 'undefined') img.alt = alt;
    if (typeof classname !== 'undefined') img.classList.add(...classname);
    if (typeof onImageClick !== 'undefined') img.addEventListener('click', onImageClick);
    this.template = img;
  }

  get element() {
    return this.template;
  }
}

export default Image;
