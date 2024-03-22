import Button from '../Button/Button';

export type PopularAPIType = {
  apiType: 'popular';
};

export type SearchAPIType = {
  apiType: 'search';
  query: string;
};

export type APIType = PopularAPIType | SearchAPIType;

interface MoreButtonProps {
  showNextPage: (apiType: APIType) => void;
  apiType: APIType;
}

class MoreButton {
  showNextPage;
  apiType;

  constructor({ showNextPage, apiType }: MoreButtonProps) {
    this.showNextPage = showNextPage;
    this.apiType = apiType;
  }

  render() {
    const moreButton = new Button({
      text: '더보기',
      clickEvent: () => {
        this.showNextPage(this.apiType);
      },
      id: 'more-button',
    }).render();

    const container = document.querySelector('.item-view');
    if (!container) return;
    container.append(moreButton);
  }

  static removeExistedButton() {
    const existingButton = document.querySelector('#more-button');
    if (existingButton) {
      existingButton.remove();
    }
  }

  // rerender() {

  //   this.render();
  // }
}

export default MoreButton;
