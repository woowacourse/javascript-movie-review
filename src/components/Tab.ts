const Tab = () => {
  return /*html*/ `
    <ul class="tab">
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
        </ul>
    `;
};

export default Tab;
