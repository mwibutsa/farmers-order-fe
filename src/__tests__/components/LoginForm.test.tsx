import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/LoginForm";
import { AccountContext, AuthTypes } from "@/context/AccountProvider";
import { loginHandler } from "@/lib/farmers";
import { usePathname } from "next/navigation";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: jest.fn(),
}));

// Mock the farmers lib
jest.mock("@/lib/farmers", () => ({
  loginHandler: jest.fn(),
}));

// Mock useAuth hook
jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    login: jest.fn(),
    logout: jest.fn(),
    isLoggedIn: false,
    isLoading: false,
  }),
}));

const mockLoginHandler = loginHandler as jest.MockedFunction<
  typeof loginHandler
>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

const defaultContextValue = {
  isLoggedIn: false,
  setIsLoggedIn: jest.fn(),
  switchAuth: jest.fn(),
  authType: AuthTypes.LOGIN,
};

const renderLoginForm = (
  isAdmin = false,
  contextValue = defaultContextValue
) => {
  // Mock pathname based on isAdmin flag
  mockUsePathname.mockReturnValue(isAdmin ? "/admin/login" : "/");

  return render(
    <AccountContext.Provider value={contextValue}>
      <LoginForm />
    </AccountContext.Provider>
  );
};

describe("LoginForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form fields", () => {
    renderLoginForm();
    expect(
      screen.getByRole("textbox", { name: /phone number/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows email field for admin login", () => {
    renderLoginForm(true);
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("placeholder", "Email");
  });

  it("shows phone number field for non-admin login", () => {
    renderLoginForm(false);
    const phoneInput = screen.getByRole("textbox", { name: /phone number/i });
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveAttribute("placeholder", "Phone number");
  });

  it("handles input changes", async () => {
    renderLoginForm();
    const phoneInput = screen.getByRole("textbox", { name: /phone number/i });
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(phoneInput, "1234567890");
    await userEvent.type(passwordInput, "password123");

    expect(phoneInput).toHaveValue("1234567890");
    expect(passwordInput).toHaveValue("password123");
  });

  it("disables submit when fields are empty", () => {
    renderLoginForm();
    const submitButton = screen.getByRole("button", { name: /login/i });
    expect(submitButton).toHaveClass("pointer-events-none");
  });

  it("enables submit when all fields are filled", async () => {
    renderLoginForm();
    const phoneInput = screen.getByRole("textbox", { name: /phone number/i });
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(phoneInput, "1234567890");
    await userEvent.type(passwordInput, "password123");

    const submitButton = screen.getByRole("button", { name: /login/i });
    expect(submitButton).not.toHaveClass("pointer-events-none");
  });

  it("handles successful login submission", async () => {
    mockLoginHandler.mockResolvedValueOnce({
      data: {
        accessToken: "test-token",
        expiresIn: 3600,
      },
      status: 200,
    });

    renderLoginForm();
    const phoneInput = screen.getByRole("textbox", { name: /phone number/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(phoneInput, "1234567890");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLoginHandler).toHaveBeenCalledWith(
        {
          phoneNumber: "1234567890",
          password: "password123",
        },
        false
      );
    });
  });

  it("handles login error states", async () => {
    const errorMessage = "Invalid credentials";
    mockLoginHandler.mockRejectedValueOnce(new Error(errorMessage));

    renderLoginForm();
    const phoneInput = screen.getByRole("textbox", { name: /phone number/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(phoneInput, "1234567890");
    await userEvent.type(passwordInput, "wrongpassword");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("shows loading state during submission", async () => {
    mockLoginHandler.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    renderLoginForm();
    const phoneInput = screen.getByRole("textbox", { name: /phone number/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(phoneInput, "1234567890");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toHaveClass("pointer-events-none");
      expect(submitButton).toHaveClass("bg-green-200");
    });
  });

  it("shows sign up option for non-admin users", () => {
    renderLoginForm(false);
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it("hides sign up option for admin users", () => {
    renderLoginForm(true);
    expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
  });
});
