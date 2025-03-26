import Header from "../../components/header/header";
import { $ } from "../../util/querySelector";

export default function mountSearchTitle() {
  document.body.prepend(Header());

  const query = new URLSearchParams(window.location.search).get("query");
  $("#description").textContent = `"${query}" 검색 결과`;
}
