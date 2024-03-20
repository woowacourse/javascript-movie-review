import { BaseResponse } from '../../apis/common/apiSchema.type';
import MovieAPI from '../../apis/movie/movie';
import { createElement } from '../../utils/dom/createElement/createElement';
import Component from '../Component/Component';
import MovieListCard from '../MovieListCard/MovieListCard';
import { MovieListCardProps } from '../MovieListCard/MovieListCard.type';
//TODO: 현재는 Props 타입으로 되어있지만 도메인 타입으로 수정해야 할듯!

class MovieList extends Component {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $movieItemList = createElement({ tagName: 'ul', attributeOptions: { class: 'item-list' } });

    //TODO: page를 동적으로 받아야하는 것 + API 레이어 분리
    MovieAPI.fetchMovieDetails<BaseResponse<MovieListCardProps[]>>(1)
      .then((data) => {
        if (data) {
          data.results.forEach((props) => {
            const $li = createElement({ tagName: 'li' });
            new MovieListCard($li, props);

            $movieItemList.appendChild($li);
          });
        }
      })
      .catch(() => {});

    return $movieItemList;
  }
}

export default MovieList;
