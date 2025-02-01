import Link from "next/link";
import { FC } from "react";
import Image from "next/image";

const SideNav: FC = () => {
  return (
    <nav className="pb-8 pl-8 min-h-[100svh]  min-w-36  bg-green-100">
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
    </nav>
  );
};

export default SideNav;
