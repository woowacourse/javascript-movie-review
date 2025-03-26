import { Box } from './Box';
import { Text } from './Text';
import { movieFetcher } from '../../domain/MovieFetcher';
import { movieFetcherEvent } from '../../domain/MovieFetcherEvent';
import { Button } from './Button';

let activeToast: HTMLElement | null = null;
const createToast = () => {
  if (activeToast && activeToast.parentElement) {
    activeToast.parentElement.removeChild(activeToast);
  }

  const errorState = movieFetcher.errorState;
  const errorMessage = errorState?.message || '오류가 발생했습니다';

  const toast = Box({
    classList: ['toast'],
    props: {
      children: [
        Box({
          classList: ['flex-col'],
          props: {
            children: [
              Text({
                props: {
                  textContent: errorMessage,
                },
              }),
              Box({
                classList: ['toast-button-container'],
                props: {
                  children: [
                    Button({
                      classList: ['retry-button'],
                      onClick: () => {
                        window.location.reload();
                      },
                      props: {
                        textContent: '재시도',
                      },
                    }),
                    Button({
                      type: 'button',
                      classList: ['close-button'],
                      onClick: () => {
                        toast.style.display = 'none';
                      },
                      props: {
                        textContent: '닫기',
                      },
                    }),
                  ],
                },
              }),
            ],
          },
        }),
      ],
    },
  });

  const modal = document.querySelector('#modal');
  if (modal) {
    modal.appendChild(toast);
    activeToast = toast;
  }

  return toast;
};

export const Toast = () => {
  movieFetcherEvent.subscribe(() => {
    if (movieFetcher.errorState) {
      createToast();
    }
  });
};
