import { fetchMovieDetail } from "../../APIs/movieAPI";
import { SCORE_MESSAGES } from "../../constants/config";

const modalContentTemplate = async (id, store) => {
  const movie = await fetchMovieDetail(id, (error) => alert(error.message));
  const scores = store.getState().starRatings;
  let score = scores.find((rating) => rating.id === id)?.score || 0;
  let scoreMessage = SCORE_MESSAGES[score] || "별점이 없어요";

  setTimeout(() => {
    const rateWrap = document.querySelector(".rating");
    const labels = rateWrap.querySelectorAll(".rating .rating__label");
    const radio = rateWrap.querySelector(`#star${score}`);
    if (radio) {
      radio.checked = true;
    }

    let stars = rateWrap.querySelectorAll(".rating .star-icon");

    function initStars() {
      for (let i = 0; i < stars.length; i++) {
        stars[i].classList.remove("filled");
      }
    }

    // 선택된 라디오버튼 이하 인덱스는 별점 active
    function checkedRate() {
      let checkedRadio = rateWrap.querySelector(
        '.rating input[type="radio"]:checked'
      );

      initStars();
      let previousSiblings = prevAll(checkedRadio);

      for (let i = 0; i < previousSiblings.length; i++) {
        previousSiblings[i].querySelector(".star-icon").classList.add("filled");
      }

      checkedRadio.nextElementSibling.classList.add("filled");

      function prevAll() {
        let radioSiblings = [],
          prevSibling = checkedRadio.parentElement.previousElementSibling;

        while (prevSibling) {
          radioSiblings.push(prevSibling);
          prevSibling = prevSibling.previousElementSibling;
        }
        return radioSiblings;
      }
    }

    // target보다 인덱스가 낮은 .star-icon에 .filled 추가 (별점 구현)
    function filledRate(index, length) {
      if (index <= length) {
        for (let i = 0; i <= index; i++) {
          stars[i].classList.add("filled");
        }
      }
    }

    function saveRate() {
      const checkedRadio = rateWrap.querySelector(
        '.rating input[type="radio"]:checked'
      );

      if (score !== Number(checkedRadio.value)) {
        const starRatings = scores.map((rating) =>
          rating.id === id ? { id, score: Number(checkedRadio.value) } : rating
        );
        localStorage.setItem("starRatings", JSON.stringify(starRatings));
        store.setState({
          starRatings,
        });
      }

      if (scores.every((rating) => rating.id !== id)) {
        const starRatings = [
          ...scores,
          { id, score: Number(checkedRadio.value) },
        ];
        localStorage.setItem("starRatings", JSON.stringify(starRatings));
        store.setState({
          starRatings,
        });
      }

      scoreMessage = SCORE_MESSAGES[Number(checkedRadio.value)];
      score = checkedRadio.value;
    }

    checkedRate();

    rateWrap.addEventListener("mouseenter", () => {
      const radio = rateWrap.querySelector(
        '.rating input[type="radio"]:checked'
      );
      stars = rateWrap.querySelectorAll(".star-icon");

      stars.forEach((starIcon, idx) => {
        starIcon.addEventListener("mouseenter", () => {
          initStars(); // 기선택된 별점 무시하고 초기화
          filledRate(idx, labels.length); // hover target만큼 별점 active

          // hover 시 active된 별점의 opacity 조정
          for (let i = 0; i < stars.length; i++) {
            if (stars[i].classList.contains("filled")) {
              stars[i].style.opacity = "0.5";
            }
          }
        });

        starIcon.addEventListener("mouseleave", () => {
          starIcon.style.opacity = "1";
          checkedRate(); // 체크된 라디오 버튼 만큼 별점 active
          saveRate(); // 별점 저장
        });

        // rate wrap을 벗어날 때 active된 별점의 opacity = 1
        rateWrap.addEventListener("mouseleave", () => {
          starIcon.style.opacity = "1";
        });
      });
    });
  });

  return /* html */ `
    <div class="modal-image">
      <img src="${
        movie.poster_path
          ? import.meta.env.VITE_TMDB_API_BANNER_URL + movie.poster_path
          : "./images/logo.png"
      }" alt="${movie.title}" />
    </div>
    <div class="modal-description">
      <div class="description-information">
        <h2>${movie.title}</h2>
        <p class="category">${movie.release_date.slice(
          0,
          4
        )} · ${movie.genres.join(", ")}</p>
        <p class="rate">
          <span class="label">평균</span>
          <img src="./images/star_filled.png" class="star" /><span>${
            movie.vote_average
          }</span>
        </p>
      </div>
      <hr />
      <p class="subtitle">내 별점</p>
      <div class="rating">
        <div class="rating-bar">
          <label for="star0">
            <input type="radio" id="star0" class="rating__input" name="rating" value="0">
            <span class="star-icon"></span>
          </label>
          <label class="rating__label rating__label--full" for="star2">              
            <input type="radio" id="star2" class="rating__input" name="rating" value="2">
            <span class="star-icon"></span>
          </label>
          <label class="rating__label rating__label--full" for="star4">              
            <input type="radio" id="star4" class="rating__input" name="rating" value="4">
            <span class="star-icon"></span>
          </label>
          <label class="rating__label rating__label--full" for="star6">              
            <input type="radio" id="star6" class="rating__input" name="rating" value="6">
            <span class="star-icon"></span>
          </label>
          <label class="rating__label rating__label--full" for="star8">              
            <input type="radio" id="star8" class="rating__input" name="rating" value="8">
            <span class="star-icon"></span>
          </label>
          <label class="rating__label rating__label--full" for="star10">              
            <input type="radio" id="star10" class="rating__input" name="rating" value="10">
            <span class="star-icon"></span>
          </label>
        </div>
        <div class="rating-information">
          <p class="subtitle">${scoreMessage}</p>
          <p class="subtitle color-95a1b2">(${score}/10)</p>
        </div>
      </div>
      <hr />
      <p class="subtitle">줄거리</p>
      <p class="detail">${movie.overview}</p>
    </div>
  `;
};

export default modalContentTemplate;
