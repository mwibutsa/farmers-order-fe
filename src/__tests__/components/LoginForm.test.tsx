import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "@/components/LoginForm";
import { loginHandler } from "@/lib/farmers";
import { usePathname } from "next/navigation";

// Mock the dependencies
jest.mock("@/lib/farmers");
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn(),
}));

const mockLoginHandler = loginHandler as jest.MockedFunction<
  typeof loginHandler
>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("LoginForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue("");
  });

  const renderLoginForm = () => {
    return render(<LoginForm />, {
      wrapper: ({ children }) => <div>{children}</div>,
    });
  };

  it("renders login form fields", () => {
    renderLoginForm();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows email field for admin login", () => {
    mockUsePathname.mockReturnValue("/admin/login");
    renderLoginForm();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("handles input changes", () => {
    renderLoginForm();
    const phoneInput = screen.getByLabelText(/phone number/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(phoneInput).toHaveValue("1234567890");
    expect(passwordInput).toHaveValue("password123");
  });

  it("disables submit when fields are empty", () => {
    renderLoginForm();
    const submitButton = screen.getByRole("button", { name: /login/i });

    // Initially both fields are empty
    expect(submitButton).toHaveClass("pointer-events-none");

    // Fill only one field
    const phoneInput = screen.getByLabelText(/phone number/i);
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    expect(submitButton).toHaveClass("pointer-events-none");
  });

  it("enables submit when all fields are filled", () => {
    renderLoginForm();
    const phoneInput = screen.getByLabelText(/phone number/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(submitButton).not.toHaveClass("pointer-events-none");
  });

  it("handles successful login submission", async () => {
    mockLoginHandler.mockResolvedValueOnce({
      data: {
        accessToken: "test-token",
        expiresIn: 3600,
        isAdmin: false,
      },
      status: 200,
    });

    renderLoginForm();
    const phoneInput = screen.getByLabelText(/phone number/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

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
    const phoneInput = screen.getByLabelText(/phone number/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(passwordInput, { target: { value: "wrong-password" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLoginHandler).toHaveBeenCalled();
    });
  });

  it("shows sign up option for non-admin users", () => {
    mockUsePathname.mockReturnValue("/login");
    renderLoginForm();
    expect(screen.getByText(/no account yet/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  it("hides sign up option for admin users", () => {
    mockUsePathname.mockReturnValue("/admin/login");
    renderLoginForm();
    expect(screen.queryByText(/no account yet/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /sign up/i })
    ).not.toBeInTheDocument();
  });

  it("handles loading state during submission", async () => {
    mockLoginHandler.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    renderLoginForm();
    const phoneInput = screen.getByLabelText(/phone number/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(submitButton).toHaveClass("pointer-events-none");
    expect(submitButton).toHaveClass("bg-green-200");
  });

  it("validates input fields", () => {
    renderLoginForm();
    const phoneInput = screen.getByLabelText(/phone number/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    // Empty fields
    fireEvent.click(submitButton);
    expect(submitButton).toHaveClass("pointer-events-none");

    // Only phone number
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    expect(submitButton).toHaveClass("pointer-events-none");

    // Only password
    fireEvent.change(phoneInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(submitButton).toHaveClass("pointer-events-none");

    // Both fields filled
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    expect(submitButton).not.toHaveClass("pointer-events-none");
  });
});
