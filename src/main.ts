import App from "./App.js";

const app = new App();
(async function () {
  await app.init();
})();
// https://api.themoviedb.org/3/search/movie?query=%EC%A7%B1%EA%B5%AC&include_adult=false&language=en-US&page=1
