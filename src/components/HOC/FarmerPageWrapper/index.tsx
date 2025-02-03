import PageTitle from "@/components/PageTitle";
import { FC, ReactNode } from "react";


const FarmerPageWrapper: FC<{
  children?: ReactNode;
  title?: string;
  isAdmin?: boolean;
}> = ({ children, title, isAdmin }) => {
  return (
    <main className="flex-1">
      <div className="bg-gray-100 w-full p-8">
        {title && (
          <PageTitle className={isAdmin ? "admin-title" : ""}>
            {title}
          </PageTitle>
        )}
      </div>
      <div className="pl-8 pt-2">{children}</div>
    </main>
  );
};

export default FarmerPageWrapper;
