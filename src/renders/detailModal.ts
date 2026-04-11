import { MovieInfo } from "../services/dto";

const mathRound = (value: number, numDigits:number = 1): number => {
  return Math.round(value * 10 ** numDigits) / 10 ** numDigits;
}
interface RateRepository {
  getMovieRate(id: number): number;
  setMovieRate(id: number, rate: number): void
}

class RateLocalStroageRepository implements RateRepository {
  #getRates(){
    const rates = localStorage.getItem('rates') || "{}";
    return JSON.parse(rates) || {};
  }
  getMovieRate(id: number){
    const rates = this.#getRates();

    return rates[id];
  }
  setMovieRate(id: number, rate: number){
    const prevRates = this.#getRates();
    const rates = { ...prevRates, [id]: rate };
    localStorage.setItem('rates', JSON.stringify(rates));
  }
}

const rateRepository = new RateLocalStroageRepository();

export const renderDetailModal = (movieInfo: MovieInfo) => {
  const modal = document.querySelector("#modal");
  if(!modal) return;

  const body = document.querySelector("body");
  if(!body) return;

  body.classList.add('modal-open');

  const detailModalTemplate = document.querySelector<HTMLTemplateElement>("#detail-modal-template")
  if(!detailModalTemplate) return;

  const cloneNode =detailModalTemplate.content.cloneNode(true) as DocumentFragment;

  const rootNode = cloneNode.querySelector<HTMLDivElement>('#modalBackground');
  if(!rootNode) return;

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

  const rate = rateRepository.getMovieRate(movieInfo.id);
  renderRateStart(rate, rootNode);

  const detailModalDetail = cloneNode.querySelector('#detail-modal-detail');
  if(!detailModalDetail) return;
  detailModalDetail.textContent = movieInfo.overview;

  // event binding - close
  const closeModal = cloneNode.querySelector("#closeModal");
  closeModal?.addEventListener('click', () => {
    removeDetailModal();
  });

  // event biding - rate
  const rateStar = rootNode.querySelectorAll("#detail-modal-star-box .star");
  Array.from(rateStar).forEach((star, index) => {
    star.addEventListener('click', () => {
      const rate = (index + 1) * 2;

      rateRepository.setMovieRate(movieInfo.id, rate);

      renderRateStart(rate, rootNode);
    });
  });

  modal.appendChild(cloneNode); 
}

const renderRateStart = (rate: number = 0, parentNode: HTMLDivElement) => {
  const rateStar = parentNode.querySelectorAll("#detail-modal-star-box .star");
  
  Array.from(rateStar).forEach((star, index) => {
    const isOn = rate / 2 >= (index + 1);

    if(isOn) {
      star.classList.add('on');
    } else {
      star.classList.remove('on');
    }
  });

  const starMessages = {
    2: "최악이예요",
    4: "별로예요",
    6: "보통이에요",
    8: "재미있어요",
    10: "명작이에요",
  }

  if(!rate) return;

  const starMessage = parentNode.querySelector("#detail-modal-star-message");
  if(!starMessage) return;
  const message = starMessages[rate as keyof typeof starMessages] || "";
  starMessage.textContent = message;

  const starNumber = parentNode.querySelector("#detail-modal-star-number");
  if(!starNumber) return;
  const rateMax = Math.max(...Object.keys(starMessages).map(Number))
  starNumber.textContent = `${rate.toString()}/${rateMax}`;
}

export const removeDetailModal = () => {
 const modal = document.querySelector("#modal");
  if(!modal) return;

  modal.replaceChildren();

  const body = document.querySelector("body");
  if(!body) return;

  body.classList.remove('modal-open');
}