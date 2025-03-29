import { userReviewStorage } from '../../storage/storage'
import StarIcon from './StarIcon'

function StarRatingForm(id, savedRating) {
  const state = {
    movieId: id,
    selectedRating: savedRating,
    ratingTexts: ['최악이예요', '별로예요', '보통이에요', '재미있어요', '명작이에요'],
  }

  function template() {
    return `
      <div class="my-rating-section">
        <h3 class="my-rating-title">내 별점</h3>
        <div class="stars-container" id="starsContainer">
          <div class="star-box" id="starBox">
            ${[1, 2, 3, 4, 5]
              .map(
                (value) => `
              <div class="star" data-value="${value}">
                <div class="star-bg">${StarIcon({ isFilled: false })}</div>
                <div class="star-fill" style="width: ${
                  value <= state.selectedRating / 2 ? '100%' : '0%'
                }">${StarIcon({ isFilled: true })}</div>
              </div>`
              )
              .join('')}
          </div>
          <div class="rating-text" id="ratingText">
            ${
              state.selectedRating > 0
                ? `${state.ratingTexts[state.selectedRating / 2 - 1]} <span class="rating-score">(${
                    state.selectedRating
                  }/10)</span>`
                : '별점을 등록해주세요.'
            }
          </div>
        </div>
      </div>
    `
  }

  function setEvent() {
    document.getElementById('starsContainer').removeEventListener('click', setStarRating)
    document.getElementById('starsContainer').addEventListener('click', setStarRating)
  }

  function setStarRating(e) {
    const targetStar = e.target.closest('.star')
    if (!targetStar) return

    const ratingText = document.getElementById('ratingText')
    const value = parseInt(targetStar.dataset.value, 10)
    state.selectedRating = value

    fillStars(targetStar)
    ratingText.innerHTML = `${state.ratingTexts[value - 1]} <span class="rating-score">(${
      value * 2
    }/10)</span>`
    userReviewStorage.setTarget(state.movieId, { vote_average: value * 2 })
  }

  function fillStars(targetStar) {
    let current = targetStar

    while (current) {
      const fill = current.querySelector('.star-fill')
      if (fill) fill.style.width = '100%'
      current = current.previousElementSibling
    }

    current = targetStar.nextElementSibling
    while (current) {
      const fill = current.querySelector('.star-fill')
      if (fill) fill.style.width = '0'
      current = current.nextElementSibling
    }
  }

  function setStarFn() {
    const starsContainer = document.getElementById('starsContainer')
    setEvent()
  }

  function render(targetElementId) {
    const target = document.getElementById(targetElementId)
    if (!target) return
    target.innerHTML = template()
    setEvent()
  }

  return { template, setStarFn, render }
}

export default StarRatingForm
