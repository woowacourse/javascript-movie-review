import { Box } from './Box';
import { Text } from './Text';

type ErrorType = {
  errorMessage: string;
};

export const Error = ({ errorMessage }: ErrorType) => {
  return Box({
    props: {
      children: [
        Text({
          classList: ['text-3xl', 'font-semibold'],
          props: { textContent: errorMessage },
        }),
      ],
    },
  });
};
