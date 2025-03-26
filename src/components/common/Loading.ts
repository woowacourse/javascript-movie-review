import { Box } from './Box';
import { Img } from './Img';

export const Loading = () => {
  return Box({
    classList: ['flex-center'],
    props: {
      children: [
        Img({
          src: './images/loading.png',
          width: '50',
          height: '50',
          classList: ['loading-spinner'],
        }),
      ],
    },
  });
};
