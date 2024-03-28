import './StarVoteBox.css';
import StarEmptyIcon from '../../assets/star_empty.png';

class StarVoteBox {
  score: number;
  starVoteBox;

  constructor(score = 0) {
    this.score = score;
    this.starVoteBox = document.createElement('div');
    this.starVoteBox.id = 'star-vote-box';
  }

  render() {
    const voteTitle = document.createElement('span');
    voteTitle.textContent = '내 별점';

    // const starsContainer = document.createElement('div');
    // starsContainer.id = 'stars-container';

    // const fragment = new DocumentFragment();

    // Array.from({ length: 5 }).forEach(e => {
    //   const starIcon = document.createElement('img');
    //   starIcon.classList.add('star-empty');
    //   starIcon.setAttribute('src', StarEmptyIcon);
    //   fragment.append(starIcon);
    // });

    // starsContainer.append(fragment);

    this.starVoteBox.append(voteTitle);
    const starsContainer = this.renderStars();

    return this.starVoteBox;
  }

  renderScoreInfo() {}

  renderStars() {
    const starsContainer = document.createElement('div');
    starsContainer.id = 'stars-container';

    const fragment = new DocumentFragment();

    Array.from({ length: 5 }).forEach(e => {
      const starIcon = document.createElement('img');
      starIcon.classList.add('star-empty');
      starIcon.setAttribute('src', StarEmptyIcon);
      fragment.append(starIcon);
    });

    starsContainer.append(fragment);

    this.starVoteBox.append(starsContainer);
  }
}

export default StarVoteBox;

// starFill.setAttribute('src', StarFillIcon);
// starFill.classList.add('star-icon');

// const starEmpty = document.createElement('img');
// starEmpty.setAttribute('src', StarEmptyIcon);
// starEmpty.classList.add('star-icon');
