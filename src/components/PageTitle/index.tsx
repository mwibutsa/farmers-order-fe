import { FC, ReactNode } from "react";

const PageTitle: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <h1 className="text-2xl inline-block text-green-700 font-semibold">
      {children}
    </h1>
  );
};

export default PageTitle;
