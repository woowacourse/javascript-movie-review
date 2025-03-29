import StarIcon from './StarIcon'

function StarRatingForm() {
  const state = {
    currentRating: 0,
    selectedRating: 0,
    ratingTexts: ['최악이예요', '별로예요', '보통이에요', '재미있어요', '명작이에요'],
  }

  const starSVG = `
        <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5514 23.0789L21.8558 27.0731C22.6617 27.5837 23.6622 26.8243 23.4231 25.8836L21.6016 18.7183C21.5503 18.5188 21.5564 18.3088 21.6191 18.1125C21.6819 17.9162 21.7987 17.7417 21.9563 17.6089L27.6097 12.9034C28.3525 12.2851 27.9691 11.0523 27.0147 10.9904L19.6318 10.5112C19.4329 10.497 19.2422 10.4266 19.0818 10.3082C18.9214 10.1898 18.7979 10.0283 18.7258 9.8424L15.9722 2.90828C15.8974 2.71101 15.7643 2.54117 15.5906 2.42133C15.417 2.30149 15.211 2.2373 15 2.2373C14.789 2.2373 14.583 2.30149 14.4094 2.42133C14.2357 2.54117 14.1026 2.71101 14.0278 2.90828L11.2742 9.8424C11.2021 10.0283 11.0786 10.1898 10.9182 10.3082C10.7578 10.4266 10.5671 10.497 10.3682 10.5112L2.98525 10.9904C2.03087 11.0523 1.64746 12.2851 2.3903 12.9034L8.04371 17.6089C8.20126 17.7417 8.31813 17.9162 8.38088 18.1125C8.44362 18.3088 8.4497 18.5188 8.39841 18.7183L6.70918 25.3634C6.42222 26.4922 7.62287 27.4034 8.58991 26.7907L14.4486 23.0789C14.6134 22.974 14.8047 22.9183 15 22.9183C15.1953 22.9183 15.3866 22.974 15.5514 23.0789V23.0789Z" fill="#FFC700" stroke="#FFC700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `
  function template(rating) {
    return `
         <div class="my-rating-section">
          <h3 class="my-rating-title">내 별점</h3>
          <div class="stars-container" id="starsContainer">
            <div class="star-box" id="starBox">
            <div class="star" data-value="1">
                <div class="star-bg">${StarIcon({ isFilled: false })}</div>
                <div class="star-fill" style="width: 0%">${StarIcon({ isFilled: true })}</div>
            </div>
            <div class="star" data-value="2">
              <div class="star-bg">${StarIcon({ isFilled: false })}</div>
                <div class="star-fill" style="width: 0%">${StarIcon({ isFilled: true })}</div>
            </div>
            <div class="star" data-value="3">
              <div class="star-bg">${StarIcon({ isFilled: false })}</div>
                <div class="star-fill" style="width: 0%">${StarIcon({ isFilled: true })}</div>
            </div>
            <div class="star" data-value="4">
              <div class="star-bg">${StarIcon({ isFilled: false })}</div>
                <div class="star-fill" style="width: 0%">${StarIcon({ isFilled: true })}</div>
            </div>
            <div class="star" data-value="5">
             <div class="star-bg">${StarIcon({ isFilled: false })}</div>
                <div class="star-fill" style="width: 0%">${StarIcon({ isFilled: true })}</div>
            </div>
            </div>
            <div class="rating-text" id="ratingText">별점을 등록해주세요.</div>
          </div>
        </div>
        `
  }

  function setEvent() {
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

  return { template, setStarFn }
}

export default StarRatingForm
