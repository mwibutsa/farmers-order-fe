import { useState, useCallback } from "react";

interface PaginationState {
  page: number;
  limit: number;
}

interface UsePaginationReturn {
  pagination: PaginationState;
  setPage: (page: number) => void;
  handleNext: (totalPages?: number) => () => void;
  handlePrev: () => void;
}

const usePagination = (initialPage = 1, limit = 5): UsePaginationReturn => {
  const [pagination, setPagination] = useState<PaginationState>({
    page: initialPage,
    limit,
  });

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const handleNext = useCallback((totalPages = 1) => {
    return () => {
      setPagination((prev) => ({
        ...prev,
        page: prev.page < totalPages ? prev.page + 1 : prev.page,
      }));
    };
  }, []);

  const handlePrev = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      page: prev.page > 1 ? prev.page - 1 : prev.page,
    }));
  }, []);

  return { pagination, setPage, handleNext, handlePrev };
};

export default usePagination;
