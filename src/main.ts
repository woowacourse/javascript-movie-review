import Header from "./components/Header";
import { $ } from "./util/selector";

addEventListener("load", () => {
  renderHeader();
  // renderTab();
  // renderFilter();
  // renderRestaurantList();
  // renderModal();
});

const renderHeader = () => {
  const wrap = $("#wrap");
  const header = Header();
  wrap?.insertAdjacentHTML("afterbegin", header);
};
