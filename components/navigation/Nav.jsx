"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { routes } from "@/lib/content/routes";

const LINKS = routes.map((r) => ({ label: r.label, href: `/${r.path}` }));

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-ivory/90 backdrop-blur border-b border-ink/10">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-body text-[0.6rem] tracking-[0.25em] text-royal uppercase mb-0.5">
            RCCG
          </span>
          <span className="font-display text-xl text-royal">Jesus House</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {LINKS.map((link) => (
            <Magnetic key={link.href} strength={0.25}>
              <Link href={link.href} className="font-body text-sm text-ink hover:text-royal">
                {link.label}
              </Link>
            </Magnetic>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden font-body text-sm py-2 px-1 -mr-1"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden flex flex-col gap-1 px-6 pb-6 overflow-hidden bg-ivory"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-base py-3"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
