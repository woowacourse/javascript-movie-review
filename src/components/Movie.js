class Movie {
  #title;
  #image;
  #score;
  #templateNode = this.#makeTemplateNode();

  #makeTemplateNode () {
    const movieItem = document.createDocumentFragment();

    const movieInfo = document.createElement('li');
    movieInfo.setAttribute('class', 'movie-info');

    const itemCard = document.createElement('div');
    itemCard.setAttribute('class', 'item-card');

    const image = document.createElement('img');
    image.setAttribute('class', 'item-thumbnail');
    image.setAttribute('loading', 'lazy');
    this.#image = image;

    const title = document.createElement('p');
    title.setAttribute('class', 'item-title');
    this.#title = title;

    const itemScore = document.createElement('p');
    itemScore.setAttribute('class', 'item-score');

    const starImage = document.createElement('img');
    starImage.setAttribute('src', './assets/star_filled.png');
    starImage.setAttribute('alt', '별점');

    const score = document.createTextNode('');
    this.#score = score;

    itemScore.appendChild(starImage);
    itemScore.appendChild(score);

    itemCard.appendChild(image);
    itemCard.appendChild(title);
    itemCard.appendChild(itemScore);

    movieInfo.appendChild(itemCard);

    movieItem.appendChild(movieInfo);
    return movieItem;
  }

  makeNode ({ poster_path, title, vote_average }) {
    this.#image.setAttribute('src', `https://image.tmdb.org/t/p/w500${poster_path}`);
    this.#image.setAttribute('alt', `${title}`);
    this.#title.textContent = title;

    this.#score.textContent = Number(vote_average).toFixed(1).toString();

    return this.#templateNode.cloneNode(true);
  }
}

export default Movie;
