import starFilled from '../assets/star_filled';

export default class MovieCard {
  constructor($parent) {
    this.$parent = $parent;
  }

  template(movie) {
    const { poster_path, title, vote_average } = movie;
    return `
      <li>
        <a href="#">
          <div class="item-card">
            <img
              class="item-thumbnail"
              src="${poster_path}"
              loading="lazy"
              alt="${title}"
            />
            <p class="item-title">${title}</p>
            <p class="item-score"><img src="${starFilled}" alt="별점" /> ${vote_average}</p>
          </div>
        </a>
      </li>
    `;
  }

  render() {
    this.$parent.insertAdjacentHTML('beforeend', this.template());
  }
}
