export default function WhatsAppButton() {
  const phoneNumber = "919999394814";
  const message = encodeURIComponent(
    "Hello Vinayak Technoplast, I would like to know more about your services."
  );
  const href = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-60" />
      <span className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white shadow-lg shadow-green-500/30 transition-transform duration-200 group-hover:scale-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 md:w-8 md:h-8 fill-current"
          aria-hidden="true"
        >
          <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.13-.616.13-.946 0-.17-.43-.27-.56-.33-.302-.13-2.193-.93-2.343-.93Zm-3.024 7.99c-1.747 0-3.448-.473-4.94-1.404l-3.547.93.93-3.404a9.397 9.397 0 0 1-1.547-5.193c0-5.276 4.286-9.563 9.563-9.563s9.564 4.287 9.564 9.563-4.286 9.572-9.564 9.572Zm0-21.018C9.732 4.177 4.527 9.382 4.527 15.736a11.5 11.5 0 0 0 1.547 5.762l-1.96 7.146 7.358-1.92a11.508 11.508 0 0 0 5.456 1.378c6.354 0 11.56-5.205 11.56-11.56C28.488 9.404 23.495 4.176 16.087 4.176Z" />
        </svg>
      </span>
    </a>
  );
}
