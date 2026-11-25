/**
 * Calm entrance reveal (Motion System: enter ease, 900 ms, 120 ms sequence, 16 px distance).
 * Arabic moves as whole blocks/lines — never letters. Disabled by prefers-reduced-motion in CSS.
 * Content is never hidden without JS (the `.js` class gates the hidden state) and is forced visible for print.
 */
const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
const show = (el: HTMLElement) => el.classList.add('is-in');

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          show(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((el) => io.observe(el));
} else {
  items.forEach(show);
}
window.addEventListener('beforeprint', () => items.forEach(show));
