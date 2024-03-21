import BaseComponent, {
  ElementId,
  HTMLTemplate,
} from "../abstract/BaseComponent";
import QueryState from "../../states/QueryState";

interface MovieListTitleProps {
  targetId: ElementId;
  queryState: QueryState;
}

export default class MovieListTitle extends BaseComponent {
  private queryState: QueryState;

  constructor({ targetId, queryState }: MovieListTitleProps) {
    super({ targetId });
    this.queryState = queryState;
  }

  protected getTemplate(): HTMLTemplate {
    const query = this.queryState.get();

    return `
    <h2>${query ? `"${query}" 검색결과` : "지금 인기 있는 영화"}</h2>
    `;
  }
}
