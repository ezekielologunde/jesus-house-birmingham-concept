"use client";

import { useState } from "react";

function emptyValues(fields) {
  return Object.fromEntries(fields.map((f) => [f.key, ""]));
}

function valuesFromItem(fields, item) {
  return Object.fromEntries(fields.map((f) => [f.key, item[f.key] ?? ""]));
}

function generateId(resourceLabel) {
  const slug = resourceLabel.toLowerCase().replace(/\s+/g, "-");
  return `${slug}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Generic add/edit/delete list for the Phase 3 admin console demo. Backed by
// plain useState, not localStorage — per the concept's scope, admin edits
// are in-memory only and reset on refresh; there is no backend to persist
// to or to wire back into the public site.
export function ResourceManager({ resourceLabel, fields, initialItems, renderItemTitle, renderItemSubtitle }) {
  const [items, setItems] = useState(initialItems);
  const [formMode, setFormMode] = useState(null); // null | "new" | <item id>
  const [formValues, setFormValues] = useState(emptyValues(fields));
  const [error, setError] = useState(null);

  function openNewForm() {
    setFormValues(emptyValues(fields));
    setError(null);
    setFormMode("new");
  }

  function openEditForm(item) {
    setFormValues(valuesFromItem(fields, item));
    setError(null);
    setFormMode(item.id);
  }

  function closeForm() {
    setFormMode(null);
    setError(null);
  }

  function handleFieldChange(key, value) {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const missing = fields.find((f) => f.required && !String(formValues[f.key] ?? "").trim());
    if (missing) {
      setError(`${missing.label} is required.`);
      return;
    }

    if (formMode === "new") {
      setItems((prev) => [...prev, { id: generateId(resourceLabel), ...formValues }]);
    } else {
      setItems((prev) => prev.map((item) => (item.id === formMode ? { ...item, ...formValues } : item)));
    }
    closeForm();
  }

  function handleDelete(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (formMode === id) closeForm();
  }

  function handleReset() {
    setItems(initialItems);
    closeForm();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p className="font-body text-sm text-ink/60">
          {items.length} {resourceLabel.toLowerCase()}
          {items.length === 1 ? "" : "s"}
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-body text-ink/50 hover:text-ink/80 underline transition-colors duration-200"
          >
            Reset demo data
          </button>
          <button
            type="button"
            onClick={openNewForm}
            className="rounded-full bg-royal text-ivory px-4 py-2 text-sm font-body font-semibold shadow-cta hover:shadow-cta-hover transition-[box-shadow] duration-200"
          >
            Add {resourceLabel}
          </button>
        </div>
      </div>

      {formMode ? (
        <form
          onSubmit={handleSubmit}
          method="dialog"
          noValidate
          className="mb-8 rounded-lg border border-ink/10 p-5 flex flex-col gap-3"
        >
          <p className="font-body text-sm font-semibold">
            {formMode === "new" ? `New ${resourceLabel}` : `Edit ${resourceLabel}`}
          </p>
          {fields.map((field) => (
            <label key={field.key} className="flex flex-col gap-1 text-sm font-body">
              {field.label}
              {field.type === "textarea" ? (
                <textarea
                  value={formValues[field.key] ?? ""}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  rows={3}
                  className="border border-ink/20 rounded-lg px-3 py-2 outline-none focus:border-ink/40"
                />
              ) : (
                <input
                  type={field.type}
                  value={formValues[field.key] ?? ""}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  min={field.min}
                  max={field.max}
                  className="border border-ink/20 rounded-lg px-3 py-2 outline-none focus:border-ink/40"
                />
              )}
            </label>
          ))}
          {error ? (
            <p role="alert" className="text-sm text-flame">
              {error}
            </p>
          ) : null}
          <div className="flex gap-4">
            <button
              type="submit"
              className="rounded-full bg-royal text-ivory px-4 py-2 text-sm font-body font-semibold shadow-cta hover:shadow-cta-hover transition-[box-shadow] duration-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="text-sm font-body text-ink/60 hover:text-ink transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border border-ink/10 p-4 flex flex-wrap items-start justify-between gap-3"
          >
            <div>
              <p className="font-body font-semibold">{renderItemTitle(item)}</p>
              {renderItemSubtitle ? (
                <p className="font-body text-sm text-ink/60 mt-1">{renderItemSubtitle(item)}</p>
              ) : null}
            </div>
            <div className="flex gap-4 shrink-0">
              <button
                type="button"
                onClick={() => openEditForm(item)}
                className="text-sm font-body text-royal hover:underline"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="text-sm font-body text-flame hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {items.length === 0 ? (
        <p className="font-body text-sm text-ink/50">No {resourceLabel.toLowerCase()}s yet.</p>
      ) : null}
    </div>
  );
}
