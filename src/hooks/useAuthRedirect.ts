import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAdmin, isAuthenticated } from "@/lib/localStorage";

interface RedirectConfig {
  adminPath: string;
  clientPath: string;
  loginPath: string;
  adminLoginPath: string;
}

const useAuthRedirect = (
  { adminLoginPath, clientPath, loginPath, adminPath }: RedirectConfig = {
    adminPath: "/admin/orders",
    clientPath: "/farmers/land",
    loginPath: "/",
    adminLoginPath: "/admin/login",
  }
) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated()) {
      if (isAdmin()) {
        if (pathname === loginPath || pathname === adminLoginPath) {
          router.replace(adminPath);
        }
      } else {
        if (pathname === loginPath) {
          router.replace(clientPath);
        } else if (
          pathname === adminLoginPath ||
          pathname.startsWith("/admin")
        ) {
          router.replace(clientPath);
        }
      }
    } else {
      if (pathname === adminLoginPath) {
        return;
      }
      if (pathname !== loginPath) {
        router.replace(loginPath);
      }
    }
  }, [pathname, router, adminPath, clientPath, loginPath, adminLoginPath]);
};

export default useAuthRedirect;
