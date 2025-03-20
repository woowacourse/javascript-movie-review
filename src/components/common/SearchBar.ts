import { ComponentProps } from '../../types/Component.types';
import { createElement } from '../../utils/createElement';
import { IconButton } from './IconButton';

type SearchBarProps = {
  onSubmit: (value: string) => void;
} & ComponentProps;

export const SearchBar = ({ onSubmit, classList, props }: SearchBarProps) => {
  const input = <HTMLInputElement>createElement('input', {
    classList: 'search-input',
    type: 'text',
    placeholder: '검색어를 입력해주세요.',
  });

  const iconBtn = IconButton({
    width: '16',
    height: '16',
    src: 'images/search.png',
    onClick: () => onSubmit(input.value),
    classList,
    props,
  });

  const formElement = createElement<HTMLFormElement>('form', {
    ...props,
    classList:
      'w-525 h-36 flex items-center justify-between rounded-2xl border-2 px6-py16',
    children: [input, iconBtn],
  });

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    onSubmit(input.value);
  });

  return formElement;
};
