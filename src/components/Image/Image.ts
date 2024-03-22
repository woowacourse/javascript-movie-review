interface ImageProps {
  src: string;
  alt?: string;
  onImageClick?: () => void;
}

class Image {
  private template: HTMLImageElement;

  constructor({ src, alt, onImageClick }: ImageProps) {
    const img = document.createElement('img');
    img.src = src;
    if (typeof alt !== 'undefined') img.alt = alt;
    if (typeof onImageClick !== 'undefined') img.addEventListener('click', onImageClick);
    this.template = img;
  }

  get element() {
    return this.template;
  }
}

export default Image;
