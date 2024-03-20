import OPTIONS from '../../constants/OPTIONS';

const MovieItems = {
  create() {
    const itemView = document.querySelector('.item-view');
    const movieItems = document.createElement('ul');
    movieItems.classList.add('item-list');

    [...Array(OPTIONS.movieItemCount)].forEach(() => {
      movieItems.appendChild(this.createMovieItemSkeleton());
    });

    itemView?.appendChild(movieItems);
    // if (fetch) const itemCards = movieItems.querySelectorAll('.item-card');
    // itemCards.forEach((itemCard, index) => {
    //   itemCard.replaceChildren();
    //   itemCard.appendChild(this.create(informations[index]));
    // });
  },

  // 전체 생성
  // 해당 스켈레톤 제거
  // 전체에 대한 itme-card 리스트 선택
  //  정보 받은 스켈레톤 부분 생성 생성 메서드 추가

  createMovieItemSkeleton() {
    const movieItem = document.createElement('li');

    const movieItemLink = this.createMovieItemLink(this.createMovieItemCardSkeleton());

    movieItem.appendChild(movieItemLink);

    return movieItem;
  },

  createMovieItemLink(movieItemCard: HTMLElement) {
    const movieItemLink = document.createElement('a');

    movieItemLink.setAttribute('href', '#');

    movieItemLink.appendChild(movieItemCard);

    return movieItemLink;
  },

  createMovieItemCardSkeleton() {
    const movieItemCardSkeleton = document.createElement('div');
    movieItemCardSkeleton.classList.add('item-card');

    movieItemCardSkeleton.appendChild(this.createMovieItemThumbnailSkeleton());
    movieItemCardSkeleton.appendChild(this.createMovieItemTitleSkeleton());
    movieItemCardSkeleton.appendChild(this.createMovieItemScoreSkeleton());

    return movieItemCardSkeleton;
  },

  createMovieItemThumbnailSkeleton() {
    const movieItemThumbnail = document.createElement('div');
    movieItemThumbnail.classList.add('item-thumbnail', 'skeleton');

    return movieItemThumbnail;
  },

  createMovieItemTitleSkeleton() {
    const movieItemTitle = document.createElement('div');
    movieItemTitle.classList.add('item-title', 'skeleton');

    return movieItemTitle;
  },

  createMovieItemScoreSkeleton() {
    const movieItemScore = document.createElement('div');
    movieItemScore.classList.add('item-score', 'skeleton');

    return movieItemScore;
  },
};

export default MovieItems;
/*
<section class="item-view">
          <h2>지금 인기 있는 영화</h2>
          <ul class="item-list">
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" /> 6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
            <li>
              <a href="#">
                <div class="item-card">
                  <img
                    class="item-thumbnail"
                    src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
                    loading="lazy"
                    alt="앤트맨과 와스프: 퀀텀매니아"
                  />
                  <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
                  <p class="item-score"><img src="./star_filled.png" alt="별점" />6.5</p>
                </div>
              </a>
            </li>
          </ul>
          <button class="btn primary full-width">더 보기</button>
        </section>
*/
