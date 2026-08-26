// An original mark for this demo — not a reproduction of the real RCCG/Jesus
// House Birmingham logo. A simple two-tone flame: ties to the site's own
// orange/gold palette and "Reviving Hope" theme without tracing any real
// church's actual trademark.
export function LogoMark({ className = "w-8 h-8", inner = "text-gold", outer = "text-royal" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path
        d="M16 3C11 9 8 14 8 19a8 8 0 0016 0c0-3.2-1.4-6-3.2-8.3.4 2.7-.9 4.6-2.6 4.6-1.9 0-3-1.9-2.1-4C17.2 8.7 17 5.7 16 3Z"
        className={outer}
        fill="currentColor"
      />
      <path
        d="M16 14c-1.6 2.3-2.6 4-2.6 5.8a2.6 2.6 0 105.2 0c0-.9-.3-1.6-.8-2.2.1 1.1-.5 1.8-1.3 1.8-.9 0-1.4-.8-1-1.8.4-1 .6-2.1.5-3.6Z"
        className={inner}
        fill="currentColor"
      />
    </svg>
  );
}
