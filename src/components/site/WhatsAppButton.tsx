import { FaWhatsapp } from "react-icons/fa";
import { whatsappUrl } from "@/data/contactData";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a NETENG no WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform hover:scale-105"
    >
      <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
