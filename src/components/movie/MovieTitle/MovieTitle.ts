import { createElement } from '../../../utils/dom/createElement/createElement';
import Component from '../../common/Component/Component';

interface MovieTitleProps {
  movieType: string;
}

class MovieTitle extends Component<MovieTitleProps> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const movieTitleText =
      this.props?.movieType === 'popular' ? '지금 인기 있는 영화' : `"${this.props?.movieType}" 검색 결과`;

    return createElement({ tagName: 'h2', text: movieTitleText });
  }
}

export default MovieTitle;
