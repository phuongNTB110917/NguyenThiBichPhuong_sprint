import {Content} from './content';

export interface Page {
 content: Content[];
  pageable: {
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    offset: number,
    pageSize: number,
    pageNumber: number,
    paged: boolean,
    unpaged: number
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;


}
