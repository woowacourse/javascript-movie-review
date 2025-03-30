import roundRating from '../../util/roundRating.js'
import Button from './Button.js'

function Banner(data) {
  return `
    <div class="background-container" style="background-image: url('./public/images/banner_poster_insideout2.jpg');">
        <div class="overlay" aria-hidden="true"></div>
          <div class="top-rated-movie">
            <div class="banner-logo-box">
              <img src="./public/images/banner_logo_insideout2.png" />
            </div>
            <div class="rate">
              <img src="./images/star_empty.png" class="star" />
              <span class="rate-value">7.6</span>
            </div>
            <div class="title">인사이드 아웃2</div>

            ${Button({ content: '자세히 보기', class: 'primary detail', style: 'width: 120px' })}
            
          </div>
        </div>
      </div>
    `
}

export default Banner
