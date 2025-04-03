import "./Spinner.css";

class Spinner {
  constructor($target) {
    this.$target = $target;
  }

  render() {
    const $orbitSpinner = document.createElement("div");
    $orbitSpinner.classList.add("orbit-spinner");
    $orbitSpinner.style.scale = "1";

    const $planet = document.createElement("div");
    $planet.classList.add("planet");

    const $orbit = document.createElement("div");
    $orbit.classList.add("orbit");

    const $satellite1 = document.createElement("div");
    $satellite1.classList.add("satellite", "satellite-1");

    const $satellite2 = document.createElement("div");
    $satellite2.classList.add("satellite", "satellite-2");

    $orbit.appendChild($satellite1);
    $orbit.appendChild($satellite2);

    $orbitSpinner.appendChild($planet);
    $orbitSpinner.appendChild($orbit);

    this.$target.appendChild($orbitSpinner);
  }
}

export default Spinner;
