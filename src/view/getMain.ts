import logoImg from '../assets/images/logo.png';
import starImg from '../assets/images/star_empty.png';
import getButton from './getButton';

function getDummyItem() {
  return `
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
                  <p class="item-score"><img src=${starImg} alt="별점" />6.5</p>
                </div>
              </a>
            </li>
  `;
}

function getMain() {
  const mainTag = document.createElement('main');
  mainTag.innerHTML = `
      <main>
        <section class="item-view">
          <h2>지금 인기 있는 영화</h2>
          <ul class="item-list">
            ${Array.from({ length: 20 }, getDummyItem).join('')}
          </ul>
            ${getButton()}
        </section>
      </main>
  `;
  return mainTag;
}

export default getMain;
