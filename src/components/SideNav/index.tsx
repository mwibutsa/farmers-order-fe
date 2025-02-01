"use client";

import Link from "next/link";
import { FC, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SideNav: FC = () => {
  const router = useRouter();

  const logoutHandler = useCallback(() => {
    localStorage.removeItem("loginInfo");
    router.replace("/");
  }, [router]);

  return (
    <nav className="pb-8  items-center h-[100svh]  flex flex-col min-w-36  bg-green-100">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="object-contain w-24 h-24"
      />
      <ul className="flex flex-col gap-4 mt-12">
        <li>
          <Link href="/farmers/land">Land</Link>
        </li>
        <li>
          <Link href="/farmers/orders">Orders</Link>
        </li>
        <li>
          <Link href="/farmers/account">Account</Link>
        </li>
      </ul>
      <div className="flex flex-1 flex-col">
        <div className="flex-1"></div>
        <button
          onClick={logoutHandler}
          className="rounded-sm hover:bg-green-700 hover:text-white px-4 py-1 border-2 border-green-700 text-green-700 font-bold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default SideNav;
