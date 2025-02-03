import { FC, ReactNode } from "react";

const PageTitle: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <h1
      className={`text-2xl inline-block text-green-700 font-semibold ${className}`}
    >
      {children}
    </h1>
  );
};

export default PageTitle;
