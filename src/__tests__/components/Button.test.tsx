import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/Button";

describe("Button Component", () => {
  it("renders button with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className when provided", () => {
    const customClass = "custom-class";
    render(<Button className={customClass}>Click me</Button>);

    const button = screen.getByText("Click me");
    expect(button).toHaveClass(customClass);
    expect(button).toHaveClass("text-white"); // Default class from component
    expect(button).toHaveClass("bg-green-700"); // Default class from component
  });

  it("renders with different types", () => {
    const { rerender } = render(<Button type="submit">Submit</Button>);
    expect(screen.getByText("Submit")).toHaveAttribute("type", "submit");

    rerender(<Button type="reset">Reset</Button>);
    expect(screen.getByText("Reset")).toHaveAttribute("type", "reset");

    rerender(<Button type="button">Button</Button>);
    expect(screen.getByText("Button")).toHaveAttribute("type", "button");
  });
});
