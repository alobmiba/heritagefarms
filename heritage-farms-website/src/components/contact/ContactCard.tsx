export function ContactCard() {
  return (
    <aside className="rounded-2xl bg-white shadow-md p-6">
      <h3 className="text-xl font-semibold text-[#00312D] mb-4">Contact Information</h3>
      <ul className="space-y-4 text-sm">
        <li>
          <div className="font-medium text-[#3A7817]">Location</div>
          <div>16 Twin Sisters Lake Road, Marmora, Ontario, Canada</div>
          <a
            className="underline"
            href="https://www.google.com/maps/search/?api=1&query=16%20Twin%20Sisters%20Lake%20Road%2C%20Marmora%2C%20Ontario%2C%20Canada"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Google Maps
          </a>
        </li>
        <li>
          <div className="font-medium text-[#3A7817]">Email</div>
          <a href="mailto:info@heritagefarms.ca">info@heritagefarms.ca</a>
        </li>
        <li>
          <div className="font-medium text-[#3A7817]">Phone</div>
          <a href="tel:+11234567890">+1 (123) 456-7890</a>
        </li>
        <li>
          <div className="font-medium text-[#3A7817]">Business Hours</div>
          <div>Mon–Fri: 9am–6pm • Sat: 10am–4pm</div>
        </li>
      </ul>
    </aside>
  );
}
