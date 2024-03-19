import { createElement } from '../../utils/dom/createElement/createElement';
import Component from '../Component/Component';
import MovieListCard from '../MovieListCard/MovieListCard';
//TODO: 현재는 Props 타입으로 되어있지만 도메인 타입으로 수정해야 할듯!
import { MovieListCardProps } from '../MovieListCard/MovieListCard.type';

const request = async (url: string) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      return response.json();
    }
  } catch (error: any) {
    alert('정보를 가져오는 중 에러가 발생했습니다!');
  }
};

export const fetchPopularMovies = (page: number) => {
  const url = `${process.env.BASE_URL}/popular?api_key=${process.env.API_KEY}&language=ko&page=${page}`;

  return request(url);
};

class MovieList extends Component {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $movieItemList = createElement({ tagName: 'ul', attributeOptions: { class: 'item-list' } });

    //TODO: page를 동적으로 받아야하는 것 + API 레이어 분리
    fetchPopularMovies(1).then(({ results }: { results: MovieListCardProps[] }) => {
      results.forEach((props) => {
        const $li = createElement({ tagName: 'li' });
        new MovieListCard($li, props);

        $movieItemList.appendChild($li);
      });
    });

    return $movieItemList;
  }
}

export default MovieList;
