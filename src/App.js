import Footer from "./components/Footer.js";
import HeaderArea from "./components/HeaderArea/index.js";

class App {
  #$target;

  constructor($target) {
    this.#$target = $target;
    this.#$target.appendChild(this.#template());
  }

  #template() {
    const template = document.createElement("template");
    template.innerHTML = /* html */ `
        <div id="wrap">
        ${HeaderArea()}
        <div class="container">
          <main>
            <section>
              <h2>지금 인기 있는 영화</h2>
              <ul class="thumbnail-list">
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item">
                    <img
                      class="thumbnail"
                      src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                      alt="인사이드 아웃 2"
                    />
                    <div class="item-desc">
                      <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                          >7.7</span
                        >
                      </p>
                      <strong>인사이드 아웃 2</strong>
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          </main>
        </div>

        ${Footer()}
      </div>
    `;
    return template.content;
  }
}

export default App;
