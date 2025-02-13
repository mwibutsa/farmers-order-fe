import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { AccountContext, AuthTypes } from "@/context/AccountProvider";
import type { RenderOptions } from "@testing-library/react";

// Create a custom renderer that includes the AccountProvider
function render(
  ui: React.ReactElement,
  {
    isLoggedIn = false,
    authType = AuthTypes.LOGIN,
    ...renderOptions
  }: RenderOptions & {
    isLoggedIn?: boolean;
    authType?: AuthTypes;
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    const contextValue = {
      isLoggedIn,
      authType,
      setIsLoggedIn: jest.fn(),
      switchAuth: jest.fn(),
    };

    return (
      <AccountContext.Provider value={contextValue}>
        {children}
      </AccountContext.Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything
export * from "@testing-library/react";

// Override render method
export { render };
