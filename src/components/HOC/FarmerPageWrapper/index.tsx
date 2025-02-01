import PageTitle from "@/components/PageTitle";
import { FC, ReactNode } from "react";

const FarmerPageWrapper: FC<{ children?: ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  return (
    <main className="flex-1">
      <div className="bg-gray-100 w-full p-8">
        {title && <PageTitle>{title}</PageTitle>}
      </div>
      <div className="pl-8">{children}</div>
    </main>
  );
};

export default FarmerPageWrapper;
