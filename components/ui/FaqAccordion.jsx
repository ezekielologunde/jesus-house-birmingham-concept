"use client";

import { useState } from "react";

export function FaqAccordion({ items, defaultOpenId = null }) {
  const [openId, setOpenId] = useState(defaultOpenId);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`border rounded-lg bg-white transition-colors ${
              isOpen ? "border-royal/30 bg-sky/30" : "border-ink/10"
            }`}
          >
            <button
              type="button"
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-body font-medium text-ink"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span>{item.question}</span>
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={`shrink-0 text-royal transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  d="M3 6l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              id={`faq-panel-${item.id}`}
              aria-hidden={!isOpen}
              className="grid transition-[grid-template-rows] duration-200 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="font-body text-sm text-ink/70 px-5 pb-4">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
