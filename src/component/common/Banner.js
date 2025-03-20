import roundRating from "../../util/roundRating.js"

function Banner(data){
    return `
    <div class="background-container" style="background-image: url('https://media.themoviedb.org/t/p/w440_and_h660_face/${data.poster_path}');">
        <div class="overlay" aria-hidden="true"></div>
          <div class="top-rated-movie">
            <div class="rate">
              <img src="./images/star_empty.png" class="star" />
              <span class="rate-value">${roundRating(data.vote_average)}</span>
            </div>
            <div class="title">${data.title}</div>
            <button class="primary detail" style="width: 120px">자세히 보기</button>
          </div>
        </div>
      </div>
    `
}

export default Banner