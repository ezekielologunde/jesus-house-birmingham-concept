// Consistent icon badge: a lucide icon inside a branded rounded square.
// Replaces plain-text/emoji markers with crisp, themeable vector icons.
export function IconBadge({ icon: Icon, size = 44, iconSize = 20, className = "" }) {
  return (
    <span
      className={`inline-grid place-items-center rounded-lg shrink-0 bg-sky text-royal ${className}`}
      style={{ width: size, height: size }}
    >
      <Icon size={iconSize} strokeWidth={1.75} aria-hidden />
    </span>
  );
}
