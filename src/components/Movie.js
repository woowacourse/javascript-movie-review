class Movie {
  #title;
  #score;
  #templateNode = this.#makeTemplateNode();

  #makeTemplateNode () {
    const movieItem = document.createDocumentFragment();

    const movieInfo = document.createElement('li');
    movieInfo.setAttribute('class', 'movie-info');

    const itemCard = document.createElement('div');
    itemCard.setAttribute('class', 'item-card');

    const image = document.createElement('div');
    image.setAttribute('class', 'item-thumbnail skeleton');

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
    this.#title.textContent = title;

    this.#score.textContent = Number(vote_average).toFixed(1).toString();

    const node = this.#templateNode.cloneNode(true);
    const skeletonImage = node.querySelector('div .skeleton');
    const movieImage = document.createElement('img');

    movieImage.onload = () => {
      skeletonImage.replaceWith(movieImage);
    };
    movieImage.setAttribute('src', `https://image.tmdb.org/t/p/w500${poster_path}`);
    movieImage.setAttribute('alt', `${title}`);

    return node;
  }
}

export default Movie;
