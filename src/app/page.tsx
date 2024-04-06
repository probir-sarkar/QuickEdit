import ContactTable from "@/components/ContactTable";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div className=" max-w-6xl mx-auto mt-8">
      <div className="flex justify-end my-4">
        <Link href="/contact-form" className="flex items-center bg-gray-700 p-2 text-white ">
          <Plus /> <span>Add Contact</span>
        </Link>
      </div>
      <ContactTable />
    </div>
  );
}
