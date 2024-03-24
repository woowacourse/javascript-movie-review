import { $ } from '../utils/domUtils';

class DomController {
  public static state = {
    $moreButton: <HTMLButtonElement>{}
  };

  /* Dom 로딩 후 반드시 초기화 한다. */
  public static initController() {
    const $moreButton = $('.item-view button') as HTMLButtonElement;

    DomController.state = {
      $moreButton
    };
  }

  public static hiddenMoreButton() {
    this.state.$moreButton.classList.add('hidden');
  }

  public static showMoreButton() {
    this.state.$moreButton.classList.remove('hidden');
  }
}

export default DomController;
