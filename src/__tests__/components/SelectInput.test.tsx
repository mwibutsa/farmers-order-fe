import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectInput from "@/components/SelectInput";

describe("SelectInput Component", () => {
  const defaultProps = {
    name: "test-select",
    label: "Test Select",
    options: [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
    ],
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with label and options", () => {
    render(<SelectInput {...defaultProps} />);
    expect(screen.getByLabelText("Test Select")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("shows default placeholder option", () => {
    render(<SelectInput {...defaultProps} />);
    expect(
      screen.getByText(`Select a ${defaultProps.label}`)
    ).toBeInTheDocument();
  });

  it("handles value changes", () => {
    render(<SelectInput {...defaultProps} />);
    const select = screen.getByLabelText("Test Select");
    fireEvent.change(select, { target: { value: "1" } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("can be disabled", () => {
    render(<SelectInput {...defaultProps} disabled />);
    const select = screen.getByLabelText("Test Select");
    expect(select).toBeDisabled();
    expect(select.parentElement).toHaveClass("opacity-95");
  });

  it("displays selected value", () => {
    render(<SelectInput {...defaultProps} value="1" />);
    const select = screen.getByLabelText("Test Select");
    expect(select).toHaveValue("1");
  });

  it("applies correct styling classes", () => {
    render(<SelectInput {...defaultProps} />);
    const select = screen.getByLabelText("Test Select");
    expect(select).toHaveClass(
      "bg-gray-50",
      "border",
      "border-gray-300",
      "text-gray-900",
      "text-sm",
      "rounded-lg"
    );
  });
});
