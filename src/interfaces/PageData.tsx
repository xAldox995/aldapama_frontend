import Fattura from "./fattura";

interface PageData {
    totalElements: number;
    totalPages: number;
    size: number;
    content: Fattura[];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    last: boolean;
    pageable: {
      offset: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      unpaged: boolean;
      pageSize: number;
      pageNumber: number;
      paged: boolean;
    };
    empty: boolean;
  }
  export default PageData