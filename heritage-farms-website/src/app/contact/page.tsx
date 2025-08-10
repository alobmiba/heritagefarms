import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactCard } from "@/components/contact/ContactCard";
import { MapFullBleed } from "@/components/contact/MapFullBleed";

export const metadata: Metadata = {
  title: "Contact Us | Heritage Farms",
  description: "Have questions about our heritage greens? We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <ContactForm />
            <ContactCard />
          </div>
        </div>
      </section>

      <MapFullBleed />
    </>
  );
} 