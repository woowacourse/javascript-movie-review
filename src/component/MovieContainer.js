import itemScoreIconPath from '../asset/star_filled.png';

function createMovieContainer({ title, movieList, hasNextPage }) {
  const section = document.createElement('section');
  section.classList.add('item-view');

  const titleHeader = document.createElement('h2');
  titleHeader.textContent = title;

  section.append(titleHeader, createMovieList(movieList));

  if (hasNextPage) {
    section.append(createMoreButton());
  }

  return section;
}

function createMovieList(movieList) {
  console.log(movieList);
  const movieListContainer = document.createElement('ul');
  movieListContainer.classList.add('item-list');

  const movieItems = movieList.map((movie) => {
    const movieData = movie.data;

    const aLink = document.createElement('a');
    aLink.href = '#';

    const itemCard = document.createElement('div');
    itemCard.classList.add('item-card');

    const itemThumbnail = document.createElement('img');
    itemThumbnail.classList.add('item-thumbnail');
    itemThumbnail.src = movieData.posterPath;
    itemThumbnail.loading = 'lazy';
    itemThumbnail.alt = movieData.title;

    const itemTitle = document.createElement('p');
    itemTitle.classList.add('item-title');
    itemTitle.textContent = movieData.title;

    const itemScore = document.createElement('p');
    itemScore.classList.add('item-score');
    const itemScoreIcon = document.createElement('img');
    itemScoreIcon.src = itemScoreIconPath;
    itemScoreIcon.alt = '별점';

    itemScore.append(itemScoreIcon, movieData.voteAverage);
    itemCard.append(itemThumbnail, itemTitle, itemScore);
    aLink.append(itemCard);

    return aLink;
  });

  movieItems.forEach((item) => movieListContainer.append(item));

  // movieListContainer.append([...movieItems]);
  return movieListContainer;
}

function createMoreButton() {
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('btn', 'primary', 'full-width');
  button.textContent = '더 보기';
  return button;
}

export default createMovieContainer;
