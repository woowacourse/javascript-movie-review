export default function Main() {
  const $main = document.createElement("main");

  $main.innerHTML = /*html*/ `
    <section>
      <h2 class="thumbnail-title">지금 인기 있는 영화</h2>
      <ul class="thumbnail-list"></ul>
      <div class="error close">
        <img src="./images/woowawa_planet.svg" alt="woowawa_planet" />
        <h2 class="error-message"></h2>
      </div>
    </section>
  `;

  return $main;
}
