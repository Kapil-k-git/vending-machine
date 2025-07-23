import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

describe("Navbar Component", () => {
  it("renders the Vending Machine title", () => {
    render(<Navbar />);
    
    // ✅ Test the title text exists
    const title = screen.getByText(/vending machine/i);
    expect(title).toBeInTheDocument();
  });

  it("renders with correct typography variant", () => {
    render(<Navbar />);
    
    const title = screen.getByText(/vending machine/i);
    expect(title.tagName).toBe("H5"); // Typography with variant="h5" renders as <h5>
  });
});
