import MovieCardSection from '.';

import { ID } from '../../constants/selector';
import movieStates from '../../states/movies';
import { $ } from '../../utils/dom';

const LoadMoreButton = {
  template() {
    return `<button id=${ID.LOAD_MORE_BUTTON} class="btn primary full-width">더 보기</button>`;
  },

  setEvent() {
    const button = $<HTMLButtonElement>(`#${ID.LOAD_MORE_BUTTON}`);

    button.addEventListener('click', () => {
      MovieCardSection.render(movieStates.getQuery());
    });
  },

  handleVisibility(state: boolean) {
    const button = $<HTMLButtonElement>(`#${ID.LOAD_MORE_BUTTON}`);

    if (state) {
      return button.classList.add('hide');
    }

    return button.classList.remove('hide');
  },
};

export default LoadMoreButton;
