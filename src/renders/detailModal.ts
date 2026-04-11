import { MovieInfo } from "../services/dto";

const mathRound = (value: number, numDigits:number = 1): number => {
  return Math.round(value * 10 ** numDigits) / 10 ** numDigits;
}

export const renderDetailModal = (movieInfo: MovieInfo) => {
  const modal = document.querySelector("#modal");
  if(!modal) return;

  const body = document.querySelector("body");
  if(!body) return;

  body.classList.add('modal-open');

  const detailModalTemplate = document.querySelector<HTMLTemplateElement>("#detail-modal-template")
  if(!detailModalTemplate) return;

  const cloneNode =detailModalTemplate.content.cloneNode(true) as DocumentFragment;

  const detailModalImg = cloneNode.querySelector<HTMLImageElement>('#detail-modal-img');
  if(!detailModalImg) return;

  const BASE_URL = `https://media.themoviedb.org/t/p/w600_and_h900_face`
  detailModalImg.src = BASE_URL + movieInfo.poster_path;
  detailModalImg.title = movieInfo.title;

  const detailModalTitle = cloneNode.querySelector('#detail-modal-title');
  if(!detailModalTitle) return;
  detailModalTitle.textContent = movieInfo.title;

  const detailModalCategory = cloneNode.querySelector('#detail-modal-category');
  if(!detailModalCategory) return;
  const year = new Date(movieInfo.release_date).getFullYear();
  const genres = movieInfo.genres.map(genre => genre.name).join(", ");
  const category = `${year} · ${genres}`;
  detailModalCategory.textContent = category;

  const detailModalRate = cloneNode.querySelector('#detail-modal-rate');
  if(!detailModalRate) return;
  detailModalRate.textContent = mathRound(movieInfo.vote_average).toString();

  renderRateStart(movieInfo.id);

  const detailModalDetail = cloneNode.querySelector('#detail-modal-detail');
  if(!detailModalDetail) return;
  detailModalDetail.textContent = movieInfo.overview;

  // event binding - close
  const closeModal = cloneNode.querySelector("#closeModal");
  closeModal?.addEventListener('click', () => {
    removeDetailModal();
  });

  // event biding - rate
  const rateStar = cloneNode.querySelectorAll("#detail-modal-star-box .star");
  Array.from(rateStar).forEach((star, index) => {
    star.addEventListener('click', () => {
      const rate = (index + 1) * 2;

      const prevRates = localStorage.getItem('rate') ? JSON.parse(localStorage.getItem('rate') || ""): {};

      const { id } = movieInfo;
      const rates = { ...prevRates, [id]: rate };
      localStorage.setItem('rates', JSON.stringify(rates));

      renderRateStart(id);
    });
  });

  modal.appendChild(cloneNode); 
}

const renderRateStart = (id: number) => {
  const parentNode = document.querySelector('#modal');
  if(!parentNode) return;

  const rates = JSON.parse(localStorage.getItem('rates')|| "");
  const rate = rates[id];
  
  const rateStar = parentNode.querySelectorAll("#detail-modal-star-box .star");
  
  Array.from(rateStar).forEach((star, index) => {
    const isOn = rate / 2 >= (index + 1);

    if(isOn) {
      star.classList.add('on');
    } else {
      star.classList.remove('on');
    }
  });
}

export const removeDetailModal = () => {
 const modal = document.querySelector("#modal");
  if(!modal) return;

  modal.replaceChildren();

  const body = document.querySelector("body");
  if(!body) return;

  body.classList.remove('modal-open');
}