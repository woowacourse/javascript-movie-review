import { WholeScreenMessageAlert } from './components';
import Store from './Store';

const $itemView = document.createElement('section');

const storeProxy = ({ listTitle, itemList, moreButton }) => {
  const props = {
    nextPage: (value) => (value === -1 ? moreButton.hide() : moreButton.show()),
    query: () => listTitle.render($itemView),
    movies: () => {
      itemList.render($itemView);
      moreButton.render($itemView);
    },
    error: (value) => {
      const { isError, message } = value;

      if (isError === false);

      $itemView.innerHTML = WholeScreenMessageAlert(message);
    },
  };

  return new Proxy(Store.getState(), {
    get: (target, props) => {
      return target[props];
    },

    set: async (target, props, value) => {
      target[props] = value;

      switch (props) {
        case 'nextPage':
          value === -1 ? moreButton.hide() : moreButton.show();
          break;

        case 'query':
          listTitle.render($itemView);
          break;

        case 'movies':
          itemList.render($itemView);
          moreButton.render($itemView);
          break;

        case 'error':
          const { isError, message } = value;

          if (isError === false) break;

          $itemView.innerHTML = WholeScreenMessageAlert(message);
          break;
        default:
      }

      return true;
    },
  });
};

export default new Proxy(Store.getState(), {
  get: (target, props) => {
    return target[props];
  },

  set: async (target, props, value) => {
    target[props] = value;

    switch (props) {
      case 'nextPage':
        value === -1 ? moreButton.hide() : moreButton.show();
        break;

      case 'query':
        listTitle.render($itemView);
        break;

      case 'movies':
        itemList.render($itemView);
        moreButton.render($itemView);
        break;

      case 'error':
        const { isError, message } = value;

        if (isError === false) break;

        $itemView.innerHTML = WholeScreenMessageAlert(message);
        break;
      default:
    }

    return true;
  },
});
