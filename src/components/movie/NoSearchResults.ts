import { createElement } from "../../utils/createElement.ts";

const NoSearchResults = () => {
  return createElement(/*html*/ `
    <div class="no-result">
      <img src="./images/no_result_logo.png" alt="검색 결과 없음"/>
      <h2>검색 결과가 없습니다.</h2>
    </div>  
  `);
};
export default NoSearchResults;
