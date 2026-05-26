const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
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

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const number = entry.target;
      const target = Number(number.dataset.count);
      const duration = 1200;
      const startTime = performance.now();

      function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        number.textContent = `${Math.floor(target * eased)}+`;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
      countObserver.unobserve(number);
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll("[data-count]").forEach((number) => countObserver.observe(number));

document.querySelector(".booking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const service = form.service.value;
  const name = form.name.value || "there";
  const message = encodeURIComponent(
    `Hello KP Bogosi, my name is ${name}. I would like to book a ${service}.`
  );

  window.location.href = `https://wa.me/27000000000?text=${message}`;
});
