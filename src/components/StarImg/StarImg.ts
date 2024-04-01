const StarImg = {
  create(starSrcValue: string): HTMLElement {
    const star = document.createElement('img');

    star.src = starSrcValue;
    star.alt = '별점';

    return star;
  },
};

export default StarImg;
