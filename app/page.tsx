import Cart from "@/components/cart";
import { getPhones, getPhoneById } from "../lib/api/api";
import type { Phone } from "../lib/api/types";

export default async function Home() {
  const phones: Phone[] = await getPhones();
  const getPhoneByIdResult = await getPhoneById(phones[0].id);


  return (
    <div>
      <main>
        {phones.map((phone) => (
          <div key={phone.id}>
            <p>{phone.name}</p>
          </div>
        ))}
        <Cart phone={getPhoneByIdResult} />
      </main>
    </div>
  );
}
