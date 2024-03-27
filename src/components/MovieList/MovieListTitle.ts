import BaseComponent from "../abstract/BaseComponent";
import QueryState from "../../states/QueryState";
import { HTMLTemplate, TargetId } from "../../types/common";

interface MovieListTitleProps {
  targetId: TargetId;
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
      <h2 id="movie-list-title" class="movie-list-title">
        ${query ? `"${query}" 검색 결과` : "지금 인기 있는 영화"}
      </h2>
    `;
  }
}
