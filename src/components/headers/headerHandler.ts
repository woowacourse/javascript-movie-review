import { executeEventListener } from "../../utils/eventListener";
import { $ } from "../../utils/selector";
import { updateMovies } from "../../domain/movies";
import Store from "../../domain/Store";

const store: Store = Store.getInstance();

export const onSubmitSearchBox = () => {
  $(".search-box").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const keyword = String(formData.get("search-bar"));
    searchMovieByKeyword(keyword);
  });
};

const searchMovieByKeyword = (keyword: string) => {

  if (keyword === "") return;

  store.resetMoviesAndPages();
  store.setLastKeyword(keyword);

  updateMovies(keyword);
}

export const onClickLogo = () => {
  $("#logo").addEventListener("click", () => {
    store.resetMoviesAndPages();
    store.setLastKeyword("");

    updateMovies();
  })
};

export const onClickMobileSearchButtonOpen = () => {
  $("#search-form-mobile").addEventListener("click", (event) => {
    $('#logo-mobile').classList.add('display-none');
    $('#search-input-mobile').classList.remove('display-none');
    $("#search-form-mobile").classList.add('w-100');
  });

}

export const mobileSearchInputEnterListener = () => {
  const input = $('#search-input-mobile') as HTMLInputElement;
  input.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const keyword = input.value;
      searchMovieByKeyword(keyword);
    }
  });
  input.addEventListener('focusout', () => {
    console.log('focusout!');
    $('#logo-mobile').classList.remove('display-none');
    $('#search-input-mobile').classList.add('display-none');
    $("#search-form-mobile").classList.remove('w-100');
    ($('#search-input-mobile') as HTMLInputElement).value = ''
  })
}

export const mobileSearchButtonListener = () => {
  $('#search-button-mobile').addEventListener('click', () => {
    const input = $('#search-input-mobile') as HTMLInputElement;
    const keyword = input.value;
    if (keyword !== '') {
      searchMovieByKeyword(keyword);
    }
  })
}