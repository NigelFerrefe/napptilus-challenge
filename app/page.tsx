import { PhoneList } from "@/components/phoneList/PhoneList";
import { getPhones } from "@/lib/api/api";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_OFFSET } from "@/lib/constants";

export default async function Home() {
  const phones = await getPhones(undefined, DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_OFFSET);
  
  return (
    <main className="mainContainer">
      <PhoneList initialPhones={phones} />
    </main>
  );
}