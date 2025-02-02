export interface PaginatedResponse<T> {
  data: {
    data: T[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}
