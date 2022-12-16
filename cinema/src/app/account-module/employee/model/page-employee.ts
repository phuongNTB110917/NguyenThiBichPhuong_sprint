import { Content } from './content';

export interface PageAccount {
  content: Content[];
  pageable: {
    sort: {
      empty: true,
      sorted: false,
      unsorted: true
    },
    offset: number,
    pageSize: number,
    pageNumber: number,
    unpaged: false,
    paged: true
  };
  last: false;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: true,
    sorted: false,
    unsorted: true
  };
  numberOfElements: number;
  first: false;
  empty: false;
}

