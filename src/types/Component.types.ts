import { ElementProps } from '../utils/createElement.ts';

// TODO : 타입명 추후 변경 예정
export type ComponentProps = {
  classList?: string[];
  props?: ElementProps;
};
