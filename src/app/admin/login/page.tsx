"use client";
import LoginForm from "@/components/LoginForm";
import { AccountContext } from "@/context/AccountProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const { isLoggedIn } = useContext(AccountContext);
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/admin/orders");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex flex-col h-[100svh] w-full">
      <main className="flex-[0.6] w-full flex items-center">
        <div className="w-96 mx-auto flex flex-col items-center h-full justify-center">
          <div className="text-center mb-12">
            <h1 className="text-2xl font-bold text-green-600">
              Manage farmers&apos;orders
            </h1>
          </div>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
