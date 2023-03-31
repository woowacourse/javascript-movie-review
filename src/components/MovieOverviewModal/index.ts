import { MY_VOTE } from '../../constants/movieChart';
import { assemble, Event } from '../../core';
import { MovieInfo, MyVote } from '../../domain/Movie';
import { $, getClosest, getElement } from './../../utils/common/domHelper';

export interface MovieOverview
  extends Pick<MovieInfo, 'id' | 'title' | 'vote_average' | 'overview' | 'poster_path' | 'my_vote'> {
  genres: string[];
}
export interface MovieOverviewModalProps {
  focusedMovie: MovieOverview;
  closeModal: VoidFunction;
  setMyVote(vote: MyVote): void;
}

const MovieOverviewModal = assemble((props: MovieOverviewModalProps) => {
  const {
    focusedMovie: { id, title, overview, vote_average, my_vote, genres, poster_path },
    closeModal,
    setMyVote,
  } = props;

  const $events: Event[] = [
    {
      event: 'click',
      callback(e) {
        if (e.target === $('.modal-backdrop') || e.target === $('.movie-overview-modal__close-btn')) closeModal();
      },
    },
    {
      event: 'click',
      callback(e) {
        const score = getClosest(e.target, '.vote-star')?.dataset.score;
        if (score) {
          setMyVote({ id, my_vote: Number(score) });
        }
      },
    },
  ];

  const $template = getElement(
    ` 
    <div class='movie-overview-modal-container'>
      <div class='modal-backdrop'></div>
      <div class='movie-overview-modal'>
        <section class='movie-overview-modal__header'>
          <h1 class='movie-overview-modal__title'>${title}</h1>
          <button class='movie-overview-modal__close-btn'>X</button>
        </section>
        <section class='movie-overview-modal__body'>
          <aside class='movie-overview-modal__left-aside'>
            <img src=https://image.tmdb.org/t/p/w400/${poster_path} class='movie-overview-modal__poster' alt=${title}/>
          </aside>
          <aside class='movie-overview-modal__right-aside'>
            <div class='movie-overview-modal__subInfo'>
              <span class='movie-overview__genres'>${genres.join(', ')}</span>
              <div>
                <img src="./star_filled.png" class='movie-overview-modal__star-img' alt="별점"/>
                <span class='movie-overview-modal__vote-average'>${vote_average}</span>
              </div>
            </div>
            <p class='movie-overview-modal__overview'>
              ${overview.length ? overview : '영화 정보가 없습니다.'}
            </p>
            <div class='movie-overview-modal__my-vote-container'>
              <span>내 별점</span>
              <div>${getStarByMyVote(my_vote)}</div>
              <span>${parseMyVote(my_vote)}</span>
            </div>
          </aside>
        </section>
      </div>
    </div>
      
    `
  );

  return [$template, $events];
});

export { MovieOverviewModal };

const getStarByMyVote = (my_vote: number) => {
  const filled = my_vote / 2;
  const empty = 5 - filled;

  return Array.from(Array(5))
    .map((_, i) => {
      if (i < filled) return `<img class='vote-star' src="./star_filled.png" alt="별점" data-score=${(i + 1) * 2} />`;

      return `<img class='vote-star' src="./star_empty.png" alt="별점" data-score=${(i + 1) * 2} />`;
    })
    .join('');
};

const parseMyVote = (my_vote: number) => {
  switch (my_vote) {
    case 0:
      return MY_VOTE[0];
    case 2:
      return MY_VOTE[2];
    case 4:
      return MY_VOTE[4];
    case 6:
      return MY_VOTE[6];
    case 8:
      return MY_VOTE[8];
    case 10:
      return MY_VOTE[10];
    default:
      return 'Error';
  }
};
