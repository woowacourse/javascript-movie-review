import { debounce } from './../../utils/common/debounce';
import { $ } from './../../utils/common/domHelper';

const HeaderAction = () => {
  const KeywordInputComponent = (keyword: string) => {
    return (
      debounce(() => {
        $(`input[name="keyword"]`)?.setAttribute('placeholder', keyword);
      })() && ''
    );
  };

  return { KeywordInputComponent };
};

export const { KeywordInputComponent } = HeaderAction();
