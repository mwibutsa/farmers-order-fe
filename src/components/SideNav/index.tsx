"use client";
import Link from "next/link";
import { FC, useMemo } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const SideNav: FC<{ isAdmin?: boolean }> = ({ isAdmin }) => {
  const { logout } = useAuth();

  const memoizedImage = useMemo(
    () => (
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="object-contain w-24 h-24"
      />
    ),
    []
  );

  const pathname = usePathname();

  if (pathname.includes("admin/login")) {
    return null;
  }

  const pathPrefix = isAdmin ? "admin" : "farmers";

  return (
    <nav
      className={`pb-8  items-center h-[100svh]  flex flex-col min-w-36  ${
        isAdmin ? "bg-blue-900 text-white" : "bg-green-100"
      }`}
    >
      {memoizedImage}
      <ul className="flex flex-col gap-4 mt-12">
        {!isAdmin && (
          <li className="border-b pb-4">
            <Link href={`/${pathPrefix}/land`}>Land</Link>
          </li>
        )}
        <li className="border-b pb-4">
          <Link href={`/${pathPrefix}/orders`}>Orders</Link>
        </li>
      </ul>
      <div className="flex flex-1 flex-col">
        <div className="flex-1"></div>
        <button
          onClick={logout}
          className={`rounded-sm hover:bg-green-700 hover:text-white px-4 py-1 border-2 border-green-700 ${
            isAdmin
              ? "text-white border-white hover:border-green-700"
              : "text-green-700"
          } font-bold`}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default SideNav;
