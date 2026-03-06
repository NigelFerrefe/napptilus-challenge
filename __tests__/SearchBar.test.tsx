import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "@/components/searchBar/SearchBar";

const mockPhones = [
  {
    id: "1",
    brand: "Samsung",
    name: "Galaxy S24 Ultra",
    basePrice: 1329,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp",
  },
  {
    id: "2",
    brand: "Samsung",
    name: "Galaxy A25 5G",
    basePrice: 239,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp",
  },
  {
    id: "3",
    brand: "Google",
    name: "Pixel 8a",
    basePrice: 459,
    imageUrl:
      "http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp",
  },
];

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue(""),
    toString: jest.fn().mockReturnValue(""),
  }),
}));

describe("SearchBar", () => {
  beforeEach(() => mockReplace.mockClear());

  it("shows the correct dynamic results count", () => {
    const query = "samsung";
    const filteredResults = mockPhones.filter((p) =>
      p.brand.toLowerCase().includes(query),
    );

    render(<SearchBar resultsCount={filteredResults.length} />);

    expect(
      screen.getByText(`${filteredResults.length} RESULTS`),
    ).toBeInTheDocument();
  });

  it("updates input value when user types", async () => {
    const user = userEvent.setup();
    render(<SearchBar resultsCount={mockPhones.length} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "Samsung");
    expect(input).toHaveValue("Samsung");
  });

  it("updates the URL query when typing", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SearchBar resultsCount={mockPhones.length} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "Samsung");

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockReplace).toHaveBeenCalledWith(
      expect.stringContaining("query=Samsung"),
    );
    jest.useRealTimers();
  });
});
