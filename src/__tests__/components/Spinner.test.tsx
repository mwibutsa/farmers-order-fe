import React from "react";
import { render, screen } from "../utils//test-utils";
import Spinner from "@/components/Spinner";

describe("Spinner Component", () => {
  it("renders spinner with correct role", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("includes screen reader text", () => {
    render(<Spinner />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders svg element", () => {
    render(<Spinner />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("animate-spin");
  });

  it("applies correct styling classes", () => {
    render(<Spinner />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveClass("w-10");
    expect(svg).toHaveClass("h-10");
    expect(svg).toHaveClass("text-gray-200");
    expect(svg).toHaveClass("animate-spin");
  });
});
