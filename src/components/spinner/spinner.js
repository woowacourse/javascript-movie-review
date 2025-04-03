import { createElement } from "../../util/dom";

const Spinner = (scale) => {
  const $spinner = createElement("div", {
    className: "spinner-container",
  });

  $spinner.innerHTML = /*html*/ `
    <div class="orbit-spinner" style="scale: ${scale}">
        <div class="planet"></div>
        <div class="orbit">
          <div class="satellite satellite-1"></div>
          <div class="satellite satellite-2"></div>
        </div>
      </div>
  `;

  return $spinner;
};

export default Spinner;
