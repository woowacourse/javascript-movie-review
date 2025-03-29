import { userReviewStorage } from '../../storage/storage'
import roundRating from '../../util/roundRating'
import { getHTML } from '../../util/utils'
import StarIcon from '../common/StarIcon'
import StarRatingForm from '../common/StarRatingForm'

interface ModalMovieContent {
  id: string
  title: string
  release_date: string
  genres: Array<Object>
  poster_path: string
  vote_average: number
  overview: string
}

function ModalLayout() {
  render()

  function replaceContent({
    id,
    title,
    release_date,
    genres,
    poster_path,
    vote_average,
    overview,
  }: ModalMovieContent) {
    const movieTitle = document.getElementById('movieTitle')
    if (movieTitle) movieTitle.textContent = title

    const releaseDataElement = getHTML('releaseDate')
    if (releaseDataElement) releaseDataElement.textContent = release_date

    const genresElement = getHTML('genres')
    const genreText = genres.map((genre) => genre.name).join(', ')
    if (genresElement) genresElement.textContent = genreText

    const ratingNumber = document.querySelector('.rating-number')
    if (ratingNumber) ratingNumber.textContent = roundRating(vote_average).toString()

    const synopsisContent = document.querySelector('.synopsis-content')
    if (synopsisContent) synopsisContent.textContent = overview

    const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
    const imgSrc = BASE_IMAGE_URL + poster_path
    const posterImageElement = getHTML('posterImage') as HTMLImageElement
    if (posterImageElement) {
      posterImageElement.src = imgSrc
      posterImageElement.alt = title
    }

    const starRatingFormBox = getHTML('starRatingFormBox')
    const savedRatingData = userReviewStorage.find(id)
    const rating = savedRatingData ? roundRating(savedRatingData.vote_average) : 0

    if (starRatingFormBox) {
      StarRatingForm(id, rating).render('starRatingFormBox')
    }
  }

  function template() {
    return `
        <div class="modal-container">
          <div class="modal-close" id="closeModal"></div>
          <div class="modal-image">
            <img id="posterImage" class="poster-image" src="" alt="" />
          </div>
          <div class="modal-content">
            <h2 id="movieTitle" class="movie-title">인사이드 아웃 2</h2>
            <p class="movie-info">
            <span id="releaseDate">2024</span>
            · 
            <span id="genres"></span>
            </p>
            
            <div id="movieRating" class="movie-rating">
              <span class="rating-label">평균</span>
              <div class="rating-value">
                <span class="rating-star">${StarIcon({ type: 'small' })}</span>
                <span class="rating-number">0</span>
              </div>
            </div>
            <div id="starRatingFormBox">
           
            </div>
            <div class="synopsis-section">
              <h3 class="synopsis-title">줄거리</h3>
              <div class="synopsis-content">
                13살이 된 라일리의 행복을 위해 매일 바쁘게 머릿속 감정 컨트롤 본부를 운영하는 '기쁨', '슬픔', '버럭', '까칠', '소심'. 그러던 어느 날, 낯선 감정인 '불안', '당황', '따분', '부럽'이가 본부에 등장하고, 언제나 최악의 상황을 대비하며 제멋대로인 '불안'이와 기존 감정들은 계속 충돌한다. 결국 새로운 감정들에 의해 본부에서 쫓겨나게 된 기존 감정들은 다시 본부로 돌아가기 위해 위험천만한 모험을 시작하는데...
              </div>
            </div>
          </div>
          </div>
      `
  }

  function render() {
    const modalHTML = template()
    const dialog = document.getElementById('dialogID')
    if (dialog) {
      dialog.innerHTML = ''
      dialog.innerHTML = modalHTML
    }
    setEvent()
  }

  function setEvent() {
    const closeModal = document.getElementById('closeModal')
    const dialog = document.getElementById('dialogID')
    if (closeModal && dialog)
      closeModal.addEventListener('click', function () {
        dialog.close()
      })
  }

  return { render, replaceContent }
}

export default ModalLayout
