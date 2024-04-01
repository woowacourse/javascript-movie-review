import { scoreToPhrases } from './../constant/movie';
import { grayStar, yellowStar } from '../constant/svg';
import { hiddenElement, showElement } from '../util/hiddenElement';
import { isMobile, resizeWidth } from '../util/resizeWidth';
import { getScore, setLocalStorage } from '../domain/Movie';

class MyVote {
  #score = 0;
  #id = 0;

  constructor(id: number) {
    this.#id = id;
    this.#score = getScore(id.toString());

    const modalInfo = document.querySelector('.movie-info');
    modalInfo?.appendChild(this.myVoteTemplate());

    this.setEvent();
  }

  render() {
    const myVoteScore = document.querySelector('.my-vote-score');
    const voteResult = document.querySelector('.vote-result');
    if (!(myVoteScore instanceof HTMLElement)) return;
    if (!(voteResult instanceof HTMLElement)) return;

    myVoteScore.innerText = `${this.#score * 2}`;
    voteResult.innerText = scoreToPhrases[this.#score];
  }

  #createStarTag(star: string, id: string) {
    const starTag = document.createElement('li');
    starTag.innerHTML = star;
    starTag.classList.add('star-tag');
    starTag.id = id;

    return starTag;
  }

  myVoteTemplate() {
    const myVote = document.createElement('div');
    const myVoteTitle = document.createElement('div');
    const votes = document.createElement('ul');
    const myVoteScore = document.createElement('div');
    const voteResult = document.createElement('div');

    myVote.classList.add('my-vote');
    votes.classList.add('my-vote-star');
    myVoteScore.classList.add('my-vote-score');
    voteResult.classList.add('vote-result');

    for (let i = 0; i < this.#score; i++) {
      const starTag = this.#createStarTag(yellowStar, i.toString());
      votes.appendChild(starTag);
    }

    for (let i = this.#score; i < 5; i++) {
      const starTag = this.#createStarTag(grayStar, i.toString());
      votes.appendChild(starTag);
    }

    myVoteTitle.innerText = '내 별점';
    myVoteScore.innerText = `${this.#score * 2}`;
    voteResult.innerText = scoreToPhrases[this.#score];

    myVote.appendChild(myVoteTitle);
    myVote.appendChild(votes);
    myVote.appendChild(myVoteScore);
    myVote.appendChild(voteResult);

    return myVote;
  }

  clickStar() {
    const stars = document.querySelectorAll('.star-tag');

    stars.forEach((star) => {
      star.addEventListener('click', (event: Event) => {
        const li = event.currentTarget;
        if (!(li instanceof Element)) return;

        this.#score = Number(li?.id) + 1;

        stars.forEach((s) => {
          s.innerHTML = grayStar;
        });

        for (let i = 0; i < this.#score; i++) {
          this.#replaceGrayToYellow(stars[i]);
        }

        setLocalStorage({ data: { score: this.#score }, id: this.#id.toString() });
        this.render();
      });
    });
  }

  #replaceGrayToYellow(star: Element) {
    const div = document.createElement('div');
    const svg = star.childNodes[1];
    div.innerHTML = yellowStar;
    star.replaceChild(div, svg);
  }

  adjustMyVoteShow() {
    const voteResult = document.querySelector('.vote-result');
    if (isMobile()) {
      hiddenElement(voteResult);
      return;
    }
    showElement(voteResult);
  }

  setEvent() {
    resizeWidth(() => this.adjustMyVoteShow());

    this.clickStar();
  }
}

export default MyVote;
