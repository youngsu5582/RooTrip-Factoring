export abstract class QueryBase {}

export abstract class PaginatedQueryBase extends QueryBase {
  limit: number;
  offset: number;
  orderBy: OrderBy;
  page: number;

  constructor(props: PaginatedParams<PaginatedQueryBase>) {
    super();
    /**
     * 받는 게시글의 개수 제한
     */
    this.limit = props.limit || 5;
    /**
     * 지금까지 받은 게시글의 개수의 최대 값
     */
    this.offset = props.page ? props.page * this.limit : 0;
    /**
     * 현재 게시글을 받는 페이지 수
     */
    this.page = props.page || 0;

    /**
     * 게시글 받는 순서
     */
    this.orderBy = props.orderBy || { field: true, param: 'desc' };
  }
}

export type OrderBy = { field: string | true; param: 'asc' | 'desc' };

export type PaginatedQueryParams = {
  limit: number;
  page: number;
  offset: number;
  orderBy: OrderBy;
};

export type PaginatedParams<T> = Omit<
  T,
  'limit' | 'offset' | 'orderBy' | 'page'
> &
  Partial<Omit<PaginatedQueryParams, 'offset'>>;
