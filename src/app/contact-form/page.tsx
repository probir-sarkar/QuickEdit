import dynamic from "next/dynamic";

//const ContactForm = dynamic(() => import("@/components/Form"), {
//  ssr: false,
//});
import ContactForm from "@/components/Form";

export default function AddContactPage() {
  return <ContactForm />;
}
