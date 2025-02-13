import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@/components/Modal";

describe("Modal Component", () => {
  const defaultProps = {
    title: "Test Modal",
    toggleLabel: "Open Modal",
    onAccept: jest.fn(),
    onDecline: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders toggle button with correct label", () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText("Open Modal")).toBeInTheDocument();
  });

  it("opens modal when toggle button is clicked", () => {
    render(<Modal {...defaultProps}>Modal Content</Modal>);
    fireEvent.click(screen.getByText("Open Modal"));
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it.skip("closes modal when clicking outside", () => {
    render(<Modal {...defaultProps}>Modal Content</Modal>);
    fireEvent.click(screen.getByText("Open Modal"));
    const modalOverlay = screen.getByRole("dialog");
    fireEvent.click(modalOverlay);
    expect(screen.queryByText("Modal Content")).not.toBeVisible();
  });

  it("handles accept action", () => {
    render(<Modal {...defaultProps}>Modal Content</Modal>);
    fireEvent.click(screen.getByText("Open Modal"));
    fireEvent.click(screen.getByText("Confirm"));
    expect(defaultProps.onAccept).toHaveBeenCalled();
  });

  it("handles decline action", () => {
    render(<Modal {...defaultProps}>Modal Content</Modal>);
    fireEvent.click(screen.getByText("Open Modal"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(defaultProps.onDecline).toHaveBeenCalled();
  });

  it("disables buttons when loadButton is true", () => {
    render(
      <Modal {...defaultProps} loadButton>
        Modal Content
      </Modal>
    );
    fireEvent.click(screen.getByText("Open Modal"));
    expect(screen.getByText("Processing..")).toBeInTheDocument();
    expect(screen.getByText("Processing..")).toBeDisabled();
    expect(screen.getByText("Cancel")).toBeDisabled();
  });

  it("applies custom trigger classes", () => {
    const triggerClasses = "custom-class";
    render(<Modal {...defaultProps} triggerClasses={triggerClasses} />);
    const trigger = screen.getByText("Open Modal");
    expect(trigger).toHaveClass(triggerClasses);
  });

  it("handles disabled state", () => {
    render(
      <Modal {...defaultProps} disableButton>
        Modal Content
      </Modal>
    );
    fireEvent.click(screen.getByText("Open Modal"));
    const confirmButton = screen.getByText("Confirm");
    expect(confirmButton).toBeDisabled();
    expect(confirmButton).toHaveClass("pointer-events-none");
  });
});
