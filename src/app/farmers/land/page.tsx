"use client";

import FarmerPageWrapper from "@/components/HOC/FarmerPageWrapper";
import LandCard from "@/components/LandCard";
import LandForm from "@/components/LandForm";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import useLand from "@/hooks/userLand";
import usePagination from "@/hooks/usePagination";
import React, { FC, useMemo, useCallback } from "react";

const LandPage: FC = () => {
  const {
    pagination,
    setPage,
    handleNext: originalHandleNext,
    handlePrev: originalHandlePrev,
  } = usePagination(1, 5);
  const { isLoading, lands, pagination: landPagination } = useLand(pagination);

  const handleNext = useCallback(() => {
    if (landPagination?.totalPages) {
      originalHandleNext(landPagination.totalPages);
    }
  }, [originalHandleNext, landPagination?.totalPages]);

  const handlePrev = useCallback(() => {
    originalHandlePrev();
  }, [originalHandlePrev]);

  const landCards = useMemo(
    () => lands.map((land) => <LandCard key={land.id} land={land} />),
    [lands]
  );

  const header = useMemo(() => {
    if (lands.length || isLoading) {
      return (
        <h1 className="text-xl font-bold text-gray-600">You own these lands</h1>
      );
    }
    return null;
  }, [lands.length, isLoading]);

  return (
    <FarmerPageWrapper title="Land Management">
      <div className="inline-flex gap-12 items-center pt-6">
        {header}
        <LandForm />
      </div>
      {!isLoading && !lands.length && (
        <div>
          Use the button above to provide information about the land you own.
        </div>
      )}
      {isLoading && !lands.length && (
        <div className="flex pt-8 items-center gap-2">
          <Spinner /> <span>Loading lands</span>
        </div>
      )}
      {lands.length > 0 && !isLoading && (
        <div className="flex gap-4 pt-8 flex-wrap">{landCards}</div>
      )}
      <div className="py-5">
        <Pagination
          activePage={pagination.page}
          totalPages={landPagination?.totalPages || 1}
          onPageChange={setPage}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
    </FarmerPageWrapper>
  );
};

export default React.memo(LandPage);
