import { publisher } from '../store/publisher';

import { Event } from '../utils/index';

import { renderSkeletonList } from './MovieList';

export function Search() {
  const { isPopular } = publisher.state;

  Event.addEvent('submit', '.search-box', async (event) => {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
      if (isPopular) publisher.setState({ isPopular: false });

      const searchedKeyword = event.target['keyword'].value;

      publisher.setState({ page: 1, keyword: searchedKeyword });
      console.log(publisher.state.page);
      renderSkeletonList();
    }
  });

  return `
        <form class="search-box">
            <input type="text" placeholder="검색" name="keyword" required/>
            <button type="submit" class="search-button">검색</button>
        </form>
     `;
}
