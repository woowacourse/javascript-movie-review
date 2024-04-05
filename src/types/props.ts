import { RENDER_TYPE } from '../constants/movie';

export type RenderType = (typeof RENDER_TYPE)[keyof typeof RENDER_TYPE];

export interface PropsType {
  type: RenderType;
  input?: string;
}

export interface RenderInputType {
  renderType: RenderType;
  input?: string;
}
