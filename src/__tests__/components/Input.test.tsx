import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/Input";

describe("Input Component", () => {
  const defaultProps = {
    label: "Test Label",
    onChange: jest.fn(),
    name: "test-input",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with label and input field", () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByLabelText("Test Label");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "input-test-input");
  });

  it("handles value changes", () => {
    const onChange = jest.fn();
    render(<Input {...defaultProps} onChange={onChange} />);

    const input = screen.getByLabelText("Test Label");
    fireEvent.change(input, { target: { value: "test value" } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "test value" }),
      })
    );
  });

  it("applies placeholder when provided", () => {
    render(<Input {...defaultProps} placeholder="Enter value" />);
    const input = screen.getByLabelText("Test Label");
    expect(input).toHaveAttribute("placeholder", "Enter value");
  });

  it("handles different input types", () => {
    const { rerender } = render(<Input {...defaultProps} type="password" />);
    let input = screen.getByLabelText("Test Label");
    expect(input).toHaveAttribute("type", "password");

    rerender(<Input {...defaultProps} type="email" />);
    input = screen.getByLabelText("Test Label");
    expect(input).toHaveAttribute("type", "email");
  });

  it("shows required attribute when specified", () => {
    render(<Input {...defaultProps} required />);
    const input = screen.getByLabelText("Test Label");
    expect(input).toHaveAttribute("required");
  });

  it("displays initial value correctly", () => {
    render(<Input {...defaultProps} value="initial value" />);
    const input = screen.getByLabelText("Test Label");
    expect(input).toHaveValue("initial value");
  });

  it("maintains className for styling", () => {
    render(<Input {...defaultProps} />);
    const input = screen.getByLabelText("Test Label");

    expect(input).toHaveClass("bg-gray-50");
    expect(input).toHaveClass("border");
    expect(input).toHaveClass("border-gray-300");
  });

  it("generates correct id when name is not provided", () => {
    const { rerender } = render(
      <Input label="Test Label" onChange={jest.fn()} />
    );
    const input = screen.getByLabelText("Test Label");
    expect(input).toHaveAttribute("id", "input-test-label");

    rerender(<Input label="Complex Label Name" onChange={jest.fn()} />);
    const complexInput = screen.getByLabelText("Complex Label Name");
    expect(complexInput).toHaveAttribute("id", "input-complex-label-name");
  });
});
