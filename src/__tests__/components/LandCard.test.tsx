import React from "react";
import { render, screen } from "@testing-library/react";
import LandCard from "@/components/LandCard";
import { ILand } from "@/interfaces/responses";

jest.mock("@/components/OrdersForm", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="orders-form">Orders Form</div>,
  };
});

describe("LandCard Component", () => {
  const mockLand: ILand = {
    id: 1,
    farmerId: 1,
    upi: "TEST123",
    landSize: 5,
    location: "Test Location",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it("renders land information correctly", () => {
    render(<LandCard land={mockLand} />);
    expect(screen.getByText("UPI:")).toBeInTheDocument();
    expect(screen.getByText("TEST123")).toBeInTheDocument();
    expect(screen.getByText("SIZE:")).toBeInTheDocument();
    expect(screen.getByText("5 acres")).toBeInTheDocument();
    expect(screen.getByText("Test Location")).toBeInTheDocument();
  });

  it("renders without location when not provided", () => {
    const landWithoutLocation = { ...mockLand, location: "" };
    render(<LandCard land={landWithoutLocation} />);
    expect(screen.queryByText("Test Location")).not.toBeInTheDocument();
  });

  it("includes OrdersForm component", () => {
    render(<LandCard land={mockLand} />);
    expect(screen.getByTestId("orders-form")).toBeInTheDocument();
  });

  it.skip("applies correct styling classes", () => {
    render(<LandCard land={mockLand} />);
    const card = screen.getByRole("list");
    expect(card).toHaveClass(
      "flex",
      "flex-col",
      "border",
      "border-gray-300",
      "w-64",
      "p-4",
      "rounded",
      "bg-white"
    );
  });

  it("formats numbers correctly", () => {
    const landWithDecimal = { ...mockLand, landSize: 5.5 };
    render(<LandCard land={landWithDecimal} />);
    expect(screen.getByText("5.5 acres")).toBeInTheDocument();
  });
});
