import { ComponentProps } from '../../types/Component.types';
import { createElement } from '../../utils/createElement';
import { IconButton } from './IconButton';

type SearchBarProps = {
  onSubmit: VoidFunction;
} & ComponentProps;

export const SearchBar = ({ onSubmit, classList, props }: SearchBarProps) => {
  const formElement = <HTMLFormElement>createElement('form', props);

  formElement.classList.add(
    'w-525',
    'h-36',
    'flex',
    'items-center',
    'justify-between',
    'rounded-2xl',
    'outline-2',
    'text-white',
    'px6-py16',
  );

  const input = <HTMLInputElement>createElement('input', {
    type: 'text',
    placeholder: '검색어를 입력해주세요.',
    style:
      'background-color: transparent; border: none; outline: none; width: 100%;',
  });

  const iconBtn = IconButton({
    src: 'images/search.png',
    onClick: () => onSubmit,
    classList,
    props,
  });

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    onSubmit();
  });

  formElement.appendChild(input);
  formElement.appendChild(iconBtn);

  return formElement;
};
