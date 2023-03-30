import { MovieInfo, MovieInfoByKeyword } from '../../types/api';
import { assemble, Event } from '../../core';
import { getElement, $, replaceComponent } from './../../utils/common/domHelper';
import { useState, useEffect } from '../../core';
import { useModal } from '../../hooks/useModal';
import { VOTE_NULL } from '../../constants';

export interface ModalProps {
  modalData: MovieInfo | MovieInfoByKeyword;
  handleIsVisibleModal(isVisible: boolean): void;
}

const Modal = assemble<ModalProps>(({ handleIsVisibleModal, modalData }) => {
  const { poster_path, title, vote_average, id, overview, genre_ids } = modalData;
  const { genreList, isLoading, myVotes, setMyVotes } = useModal();

  useEffect(() => {
    window.onpopstate = (e) => {
      document.body.style.overflowY = 'auto';
      if (e.state === 'modal') handleIsVisibleModal(true);
      else handleIsVisibleModal(false);
    };

    document.onkeydown = (e) => {
      if ((e.key === 'Backspace' || e.key === 'Escape') && history.state === 'modal') {
        history.back();
      }
    };
  }, []);

  const $events: Event[] = [
    {
      event: 'click',
      callback(e) {
        e.preventDefault();

        if (e.target === $('.exit-button') || e.target === $('.modal-backdrop')) {
          history.back();
        }

        if ((e.target as HTMLElement).hasAttribute('data')) {
          const data = Number.parseInt((e.target as HTMLElement).getAttribute('data')!);

          const updataData = [...myVotes];
          const index = myVotes.findIndex((vote) => vote.id === id);
          if (index === -1) updataData.push({ id: id, vote: data });
          else updataData.splice(index, 1, { id: id, vote: data });

          localStorage.setItem('myvotes', JSON.stringify(updataData));
          setMyVotes(updataData);
        }
      },
    },
  ];

  function getGenreNamesByIds(genre_ids: number[]): string[] {
    return genre_ids.map((id) => genreList.genres.filter((genre) => genre.id === id)[0].name);
  }

  function getMyVote(id: number) {
    const index = myVotes.findIndex((vote) => vote.id === id);

    if (index === -1) return VOTE_NULL;
    return myVotes[index].vote;
  }

  function getCommentByVote(vote: Number): string {
    if (vote == 2) return '최악이에요';
    if (vote == 4) return '별로에요';
    if (vote == 6) return '보통이에요';
    if (vote == 8) return '재미있어요';
    if (vote == 10) return '명작이에요';
    return '';
  }
  document.body.style.overflowY = 'hidden';
  const myVote = getMyVote(id);
  const $template = getElement(
    isLoading
      ? ''
      : `
      <div class="movie-item-modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <div class="title-container">
            <p class="modal-title">${title}</p>
          </div>
          <button class="exit-button">x</button>
          <hr>

          <div class="modal-contents">
            <img
              class="item-thumbnail"
              src=https://image.tmdb.org/t/p/w200/${poster_path}
              loading="lazy"
              alt=${title}
            />

            <div class="modal-description">
              <div class="modal-text">
                <div class="modal-genre-score">
                  <p>${getGenreNamesByIds(genre_ids)}</p>
                  <img src="./star_filled.png" alt="별점" />${vote_average} 
                </div> 
                <p class="modal-overview">${overview}</p> 
              </div> 
              
              <div class="myscore-container">
                <p class="modal-myscore"> 내 별점<p>
                  <img data=2 src="./${myVote < 2 ? 'star_empty.png' : 'star_filled.png'}"/>
                  <img data=4 src="./${myVote < 4 ? 'star_empty.png' : 'star_filled.png'}"/>
                  <img data=6 src="./${myVote < 6 ? 'star_empty.png' : 'star_filled.png'}"/>
                  <img data=8 src="./${myVote < 8 ? 'star_empty.png' : 'star_filled.png'}"/>
                  <img data=10 src="./${myVote < 10 ? 'star_empty.png' : 'star_filled.png'}"/>
                  <p>${myVote === VOTE_NULL ? '' : myVote} ${getCommentByVote(myVote)}<p/> 
              </div>
            </div>
          </div>
        </div>
      </div>
  `
  );

  return [$template, $events];
});

export { Modal };
