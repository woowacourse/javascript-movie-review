import Image from '../Image/Image';
import starEmpty from '../../imgs/star_empty.png';

class EachStar {
  private star: Image;

  constructor() {
    this.star = this.createEachStar();
  }

  get element() {
    return this.star.element;
  }

  private createEachStar() {
    const star = new Image({
      src: starEmpty,
      alt: 'star-icon',
    });
    return star;
  }
}

export default EachStar;
