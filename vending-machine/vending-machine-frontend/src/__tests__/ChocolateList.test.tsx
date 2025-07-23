import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import ChocolateList from "@/components/ChocolateList";
import { DialogProps } from "@mui/material/Dialog";
import { useVendingMachine } from "@/hooks/useVendingMachine";

jest.mock("@mui/material", () => {
  const original = jest.requireActual("@mui/material");
  return {
    ...original,
    Dialog: (props: DialogProps) =>
      props.open ? <div data-testid="mock-dialog">{props.children}</div> : null,
  };
});

jest.mock("@/hooks/useVendingMachine");

const mockSetMessage = jest.fn();
const mockBuyChocolate = jest.fn();
const mockAddCash = jest.fn();
const mockRestockChocolate = jest.fn();

const mockChocolates = [
  { name: "KitKat", price: 20, quantity: 5 },
  { name: "Snickers", price: 25, quantity: 15 },
];

beforeEach(() => {
  (useVendingMachine as jest.Mock).mockReturnValue({
    chocolates: mockChocolates,
    userCash: 100,
    loading: false,
    message: "",
    setMessage: mockSetMessage,
    fetchInventory: jest.fn(),
    restockChocolate: mockRestockChocolate,
    buyChocolate: mockBuyChocolate,
    addCash: mockAddCash,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("ChocolateList Component", () => {
  test("renders chocolate cards", () => {
    render(<ChocolateList />);
    expect(screen.getByText("KitKat")).toBeInTheDocument();
    expect(screen.getByText("Snickers")).toBeInTheDocument();
  });

  test("opens buy modal on 'Buy Now' click", () => {
    render(<ChocolateList />);
    const kitkatCard = screen.getByText("KitKat").closest("div")!;
    fireEvent.click(within(kitkatCard).getByText("Buy Now"));
    expect(screen.getByText("Buy KitKat")).toBeInTheDocument();
  });

  test("shows error if inserted cash is too low", async () => {
    mockBuyChocolate.mockResolvedValue({
      success: false,
      error: "Not enough cash inserted.",
    });

    render(<ChocolateList />);
    const kitkatCard = screen.getByText("KitKat").closest("div")!;
    fireEvent.click(within(kitkatCard).getByText("Buy Now"));

    fireEvent.change(screen.getByPlaceholderText("Enter your amount"), {
      target: { value: "5" },
    });

    const modal = screen.getByTestId("mock-dialog");
    const modalBuyButton = within(modal).getByRole("button", { name: "Buy Now" });
    fireEvent.click(modalBuyButton);

    await waitFor(() => {
      expect(
        screen.getByText("Not enough cash inserted.")
      ).toBeInTheDocument();
    });
  });

  test("adds balance successfully", async () => {
    (useVendingMachine as jest.Mock).mockReturnValue({
      chocolates: mockChocolates,
      userCash: 150,
      loading: false,
      message: "Balance added",
      setMessage: mockSetMessage,
      fetchInventory: jest.fn(),
      restockChocolate: mockRestockChocolate,
      buyChocolate: mockBuyChocolate,
      addCash: mockAddCash,
    });

    render(<ChocolateList />);
    fireEvent.click(screen.getByText("Enter Balance"));

    fireEvent.change(screen.getByPlaceholderText("Enter your balance"), {
      target: { value: "50" },
    });

    fireEvent.click(screen.getByText("Add Balance"));

    await waitFor(() => {
      expect(mockAddCash).toHaveBeenCalledWith(50);
    });

    await waitFor(() => {
      expect(screen.getByText(/balance added/i)).toBeInTheDocument();
    });
  });

  test("shows restock input for low stock", () => {
    render(<ChocolateList />);
    const kitkatCard = screen.getByText("KitKat").closest("div")!;
    fireEvent.click(within(kitkatCard).getByText("Restock"));
    expect(screen.getByLabelText("Restock Quantity")).toBeInTheDocument();
  });

  test("calls restock handler", async () => {
    render(<ChocolateList />);
    const kitkatCard = screen.getByText("KitKat").closest("div")!;
    fireEvent.click(within(kitkatCard).getByText("Restock"));

    fireEvent.change(screen.getByLabelText("Restock Quantity"), {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByText("Confirm"));

    await waitFor(() => {
      expect(mockRestockChocolate).toHaveBeenCalledWith("KitKat", 10);
    });
  });
});
