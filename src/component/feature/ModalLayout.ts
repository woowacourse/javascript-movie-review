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
          <div class="modal-close" id="closeModal">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3L19 19" stroke="#95A1B2" stroke-width="4.5" stroke-linecap="round"/>
              <path d="M3 19.0005L19 3.00051" stroke="#95A1B2" stroke-width="4.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="modal-image">
            <img id="posterImage" class="poster-image" src="" alt="" />
          </div>
          
          <div class="modal-content">

          <div class="movie-content-title-box">

            <h2 id="movieTitle" class="movie-title">-</h2>
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

          </div>
            <div id="starRatingFormBox">
           
            </div>
            <div class="synopsis-section">
              <h3 class="synopsis-title">줄거리</h3>
              <div class="synopsis-content">
                -
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
    if (closeModal && dialog) {
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog || event.target.closest('#closeModal') === closeModal) {
          dialog.close()
        }
      })
    }
  }

  return { render, replaceContent }
}

export default ModalLayout
