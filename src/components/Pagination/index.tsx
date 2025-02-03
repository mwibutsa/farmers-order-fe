import { FC, useMemo, useCallback } from "react";
import React from "react";

type PaginationProps = {
  onPageChange: (activePage: number) => void;
  activePage: number;
  handleNext: () => void;
  handlePrev: () => void;
  totalPages: number;
};

const Pagination: FC<PaginationProps> = ({
  activePage,
  onPageChange,
  totalPages,
}) => {
  const handleNext = useCallback(() => {
    if (activePage < totalPages) {
      onPageChange(activePage + 1);
    }
  }, [activePage, totalPages, onPageChange]);

  const handlePrev = useCallback(() => {
    if (activePage > 1) {
      onPageChange(activePage - 1);
    }
  }, [activePage, onPageChange]);

  const renderPages = useMemo(() => {
    return [...Array(totalPages)]
      .map((_, i) => i + 1)
      .map((page) => {
        return (
          <li key={page} onClick={() => onPageChange(page)}>
            <span
              aria-current={activePage === page ? "page" : undefined}
              className={`flex cursor-pointer items-center justify-center px-3 h-8 ${
                activePage === page ? "text-blue-600" : "text-gray-500"
              } border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white`}
            >
              {page}
            </span>
          </li>
        );
      });
  }, [totalPages, activePage, onPageChange]);

  if (totalPages < 2) return null;
  return (
    <nav aria-label="Page navigation example" className="my-6">
      <ul className="inline-flex -space-x-px text-sm">
        <li onClick={handlePrev} className="cursor-pointer">
          <span className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Previous
          </span>
        </li>
        {renderPages}

        <li onClick={handleNext} className="cursor-pointer">
          <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(Pagination);
