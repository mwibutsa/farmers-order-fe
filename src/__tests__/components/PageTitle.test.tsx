import React from "react";
import { render, screen } from "../utils/test-utils";
import PageTitle from "@/components/PageTitle";

describe("PageTitle Component", () => {
  it("renders title text correctly", () => {
    render(<PageTitle>Test Title</PageTitle>);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    render(<PageTitle>Test Title</PageTitle>);
    const title = screen.getByText("Test Title");
    expect(title).toHaveClass("text-2xl");
    expect(title).toHaveClass("text-green-700");
    expect(title).toHaveClass("font-semibold");
  });

  it("accepts and applies additional className", () => {
    const customClass = "custom-class";
    render(<PageTitle className={customClass}>Test Title</PageTitle>);

    const title = screen.getByText("Test Title");
    expect(title).toHaveClass(customClass);
    expect(title).toHaveClass("text-2xl"); // Still has default classes
  });

  it("renders with correct HTML tag", () => {
    render(<PageTitle>Test Title</PageTitle>);
    const title = screen.getByText("Test Title");
    expect(title.tagName).toBe("H1");
  });
});
