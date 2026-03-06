import { render, screen } from "@testing-library/react";
import { PhoneCard } from "@/components/phoneCard/PhoneCard";
import { Phone } from "@/lib/api/types";

const mockPhone: Phone = {
  id: "SMG-S24U",
  brand: "Samsung",
  name: "Galaxy S24 Ultra",
  basePrice: 1229,
  imageUrl: "https://example.com/image.webp",
};

describe("PhoneCard", () => {
  it("renders phone brand, name and price", () => {
    render(<PhoneCard phone={mockPhone} />);

    expect(screen.getByText(mockPhone.brand.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(mockPhone.name.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(`${mockPhone.basePrice} EUR`)).toBeInTheDocument();
  });

  it("links to the correct product page", () => {
    render(<PhoneCard phone={mockPhone} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/product/${mockPhone.id}`);
  });
});