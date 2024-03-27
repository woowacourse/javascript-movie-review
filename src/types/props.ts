type MainType = 'popular' | 'search';

export interface PropsType {
  type: MainType;
  input?: string;
}
