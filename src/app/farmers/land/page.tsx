"use client";

import FarmerPageWrapper from "@/components/HOC/FarmerPageWrapper";
import LandCard from "@/components/LandCard";
import LandForm from "@/components/LandForm";
import Spinner from "@/components/Spinner";
import useLand from "@/hooks/userLand";

import { FC, useState } from "react";

const LandPage: FC = () => {
  const [pagination] = useState<{ page: number; limit: number }>({
    page: 1,
    limit: 5,
  });

  const { isLoading, lands } = useLand(pagination);
  console.log("lands", lands);

  return (
    <FarmerPageWrapper title="Land Management">
      <div className="inline-flex gap-12 items-center pt-6 ">
        {lands?.length || isLoading ? (
          <h1 className="text-xl  font-bold text-gray-600">
            You own these lands
          </h1>
        ) : null}
        <LandForm />
      </div>
      {!isLoading && !lands.length && (
        <div>
          Use the button above to provide information about the land you own.
        </div>
      )}
      {isLoading && !lands?.length ? (
        <div className="flex pt-8 items-center gap-2">
          <Spinner /> <span>Loading lands</span>
        </div>
      ) : null}
      {lands.length && !isLoading ? (
        <div className="flex gap-4 pt-8 flex-wrap">
          {lands.map((land) => (
            <LandCard key={land.id} land={land} />
          ))}
        </div>
      ) : null}
    </FarmerPageWrapper>
  );
};

export default LandPage;
