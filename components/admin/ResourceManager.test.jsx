import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ResourceManager } from "./ResourceManager";

const FIELDS = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "notes", label: "Notes", type: "textarea", required: false },
];

const INITIAL_ITEMS = [
  { id: "a", title: "First Item", notes: "hello" },
  { id: "b", title: "Second Item", notes: "world" },
];

function renderManager(overrides = {}) {
  return render(
    <ResourceManager
      resourceLabel="Item"
      fields={FIELDS}
      initialItems={INITIAL_ITEMS}
      renderItemTitle={(item) => item.title}
      renderItemSubtitle={(item) => item.notes}
      {...overrides}
    />
  );
}

describe("ResourceManager", () => {
  it("lists the initial items", () => {
    renderManager();
    expect(screen.getByText("First Item")).toBeInTheDocument();
    expect(screen.getByText("Second Item")).toBeInTheDocument();
    expect(screen.getByText("2 items")).toBeInTheDocument();
  });

  it("adds a new item through the form", () => {
    renderManager();
    fireEvent.click(screen.getByText("Add Item"));
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Third Item" } });
    fireEvent.click(screen.getByText("Save"));
    expect(screen.getByText("Third Item")).toBeInTheDocument();
    expect(screen.getByText("3 items")).toBeInTheDocument();
  });

  it("rejects a new item missing a required field", () => {
    renderManager();
    fireEvent.click(screen.getByText("Add Item"));
    fireEvent.click(screen.getByText("Save"));
    expect(screen.getByText("Title is required.")).toBeInTheDocument();
    expect(screen.getByText("2 items")).toBeInTheDocument();
  });

  it("edits an existing item", () => {
    renderManager();
    fireEvent.click(screen.getAllByText("Edit")[0]);
    const titleInput = screen.getByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "First Item (edited)" } });
    fireEvent.click(screen.getByText("Save"));
    expect(screen.getByText("First Item (edited)")).toBeInTheDocument();
    expect(screen.queryByText("First Item")).not.toBeInTheDocument();
  });

  it("deletes an item", () => {
    renderManager();
    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(screen.queryByText("First Item")).not.toBeInTheDocument();
    expect(screen.getByText("1 item")).toBeInTheDocument();
  });

  it("resets back to the initial items after edits", () => {
    renderManager();
    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(screen.getByText("1 item")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Reset demo data"));
    expect(screen.getByText("First Item")).toBeInTheDocument();
    expect(screen.getByText("2 items")).toBeInTheDocument();
  });
});
