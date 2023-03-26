import { starEmptyImage, starFilledImage } from '../../assets/images';

const UserRatingButton = {
  template(score: string, desc: string, initScore: string) {
    return `
      <button type="button" value=${score} data-desc=${desc}>
        <img src=${UserRatingButton.initImagePath(score, initScore)} alt="${score}점" />
      </button>
    `;
  },

  initImagePath(score: string, initScore: string) {
    if (Number(score) <= Number(initScore)) {
      return starFilledImage;
    }

    return starEmptyImage;
  },

  toggleStarImage(target: HTMLButtonElement, isFilled: boolean) {
    const starImage = target.querySelector<HTMLImageElement>('img');

    if (starImage === null) return;

    if (isFilled) {
      starImage.src = starFilledImage;
      return;
    }

    starImage.src = starEmptyImage;
  },
};

export default UserRatingButton;
