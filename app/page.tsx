import { PhoneList } from "@/components/phoneList/phoneList";
import "./globals.css";

export default async function Home() {
  return (
    <main className="mainContainer">
      <PhoneList />
    </main>
  );
}
