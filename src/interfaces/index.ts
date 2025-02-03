export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
  status: number;
}
