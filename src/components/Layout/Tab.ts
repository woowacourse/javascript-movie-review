export default function Tab() {
  const $tab = document.createElement("ul");
  $tab.className = "tab";

  $tab.innerHTML = /*html*/ `
    <li>
      <a href="#">
        <div class="tab-item selected"><h3>상영 중</h3></div>
      </a>
    </li>
    <li>
      <a href="#">
        <div class="tab-item"><h3>인기순</h3></div>
      </a>
    </li>
    <li>
      <a href="#">
        <div class="tab-item"><h3>평점순</h3></div>
      </a>
    </li>
    <li>
      <a href="#">
        <div class="tab-item"><h3>상영 예정</h3></div>
      </a>
    </li>
  `;

  return $tab;
}
