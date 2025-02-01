import FarmerPageWrapper from "@/components/HOC/FarmerPageWrapper";
import LandCard from "@/components/LandCard";

import { FC } from "react";

const LandPage: FC = () => {
  return (
    <FarmerPageWrapper title="Land Management">
      <h1 className="pt-12 text-xl font-bold text-gray-600">
        You own these lands
      </h1>
      <div className="flex gap-4 pt-8">
        <LandCard />
        <LandCard />
        <LandCard />
        <LandCard />
      </div>
    </FarmerPageWrapper>
  );
};

export default LandPage;
