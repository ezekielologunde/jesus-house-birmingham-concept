import { Reveal } from "@/components/ui/Reveal";

export function NumberedList({ items }) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <Reveal
          key={item.id ?? item.title}
          delay={i * 70}
          className={`grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start py-8 ${
            i > 0 ? "border-t border-ink/10" : ""
          }`}
        >
          <span className="font-display font-black text-5xl md:text-6xl text-royal leading-none tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-display text-xl md:text-2xl tracking-tight mb-2">{item.title}</p>
            <p className="font-body text-ink/70">{item.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
