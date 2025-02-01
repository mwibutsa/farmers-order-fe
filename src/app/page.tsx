"use client";

import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";
import { AccountContext, AuthTypes } from "@/context/AccountProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
  const { isLoggedIn, authType } = useContext(AccountContext);
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/farmers/land");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) return null;
  return (
    <div className="flex flex-col h-[100svh]">
      <main className="flex-1 flex">
        {/**Welcome Message */}
        <div className="p-32 flex-1 bg-img__welcome min-h-[40vh]">
          <div className="text-white bg-green-700 inline-block p-8 rounded-sm">
            <h1 className="font-bold text-2xl">Welcome to farmers corner!</h1>
            <h2 className="font-semibold text-xl">Happy Farmers</h2>
            <h3 className="font-semibold text-xl">Happy Planet</h3>
          </div>
        </div>
        <div className="flex-1">
          <div className="max-w-sm mx-auto flex flex-col h-full justify-center">
            <div className="text-center mb-12">
              <h1 className="text-2xl font-bold text-green-600">
                Connect with us for Cheap and Affordable Supplies.
              </h1>
            </div>
            {authType === AuthTypes.LOGIN ? <LoginForm /> : <SignUpForm />}
          </div>
        </div>
      </main>
      {/* <footer className="row-start-3 bg-green-600 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://mwibutsa.info"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright &copy; Mwibutsa Floribert 2025
        </a>
      </footer> */}
    </div>
  );
}
