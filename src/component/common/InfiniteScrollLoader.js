import Spinner from "./Spinner.js";

function InfiniteScrollLoader() {
    const $el = document.querySelector(".infinite-scroll-loader")

    $el.innerHTML = Spinner()
}

InfiniteScrollLoader.render = function () {
    const $el = document.querySelector(".infinite-scroll-loader")
    console.log("o")
    $el.classList.add("active")
};

InfiniteScrollLoader.hide = function () {
    const $el = document.querySelector(".infinite-scroll-loader")
    $el.classList.remove("active")
    console.log("hi")
}

export default InfiniteScrollLoader