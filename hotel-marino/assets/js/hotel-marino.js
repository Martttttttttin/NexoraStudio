const header = document.querySelector(".site-header");
const bookingForm = document.querySelector("#booking-form");
const bookingStatus = document.querySelector("#booking-status");
const contactForm = document.querySelector("#contact-form");
const whatsappNumber = "51900111222";

document.querySelectorAll(".navbar-collapse .nav-link, .navbar-collapse .nav-cta").forEach((link) => {
  link.addEventListener("click", () => {
    const collapse = link.closest(".navbar-collapse");

    if (collapse?.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(collapse).hide();
    }
  });
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

function formatDate(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}



bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(bookingForm);
  const name = String(data.get("name") || "").trim();
  const checkin = String(data.get("checkin") || "");
  const checkout = String(data.get("checkout") || "");
  const guests = String(data.get("guests") || "1");

  if (checkin && checkout && new Date(checkout) <= new Date(checkin)) {
    bookingStatus.textContent = "La fecha de salida debe ser posterior a la entrada.";
    return;
  }

  const message = [
    "Hola, quisiera solicitar una reserva en Hotel-Marino.",
    `Nombre: ${name}`,
    `Entrada: ${formatDate(checkin)}`,
    `Salida: ${formatDate(checkout)}`,
    `Huéspedes: ${guests}`
  ].join("\n");

  bookingStatus.textContent = "Abriendo WhatsApp para enviar tu solicitud...";
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const name = String(data.get("contactName") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();
  const subject = encodeURIComponent(`Consulta web de ${name}`);
  const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`);

  window.location.href = `mailto:reservas@hotelmarino.pe?subject=${subject}&body=${body}`;
});
