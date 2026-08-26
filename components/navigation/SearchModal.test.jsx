import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchModal } from "./SearchModal";
import { push } from "@/tests/mocks/next-navigation";

describe("SearchModal", () => {
  beforeEach(() => {
    push.mockClear();
  });

  it("renders nothing when closed", () => {
    const { container } = render(<SearchModal open={false} onClose={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("shows quick-link hints with no query", () => {
    render(<SearchModal open onClose={() => {}} />);
    expect(screen.getByText("Quick links")).toBeInTheDocument();
    expect(screen.getByText("Giving")).toBeInTheDocument();
  });

  it("filters results as the visitor types", () => {
    render(<SearchModal open onClose={() => {}} />);
    fireEvent.change(screen.getByLabelText("Search the site"), { target: { value: "prayer" } });
    expect(screen.getByText("Submit a prayer request to Jesus House Birmingham (unofficial concept).")).toBeInTheDocument();
    expect(screen.queryByText("No results")).not.toBeInTheDocument();
  });

  it("shows a no-results state for a query that matches nothing", () => {
    render(<SearchModal open onClose={() => {}} />);
    fireEvent.change(screen.getByLabelText("Search the site"), { target: { value: "zzzznotarealpage" } });
    expect(screen.getByText(/no results for/i)).toBeInTheDocument();
  });

  it("navigates and closes when a result is clicked", () => {
    let closed = false;
    render(<SearchModal open onClose={() => (closed = true)} />);
    fireEvent.change(screen.getByLabelText("Search the site"), { target: { value: "giving" } });
    fireEvent.click(screen.getByText("Giving"));
    expect(push).toHaveBeenCalledWith("/giving");
    expect(closed).toBe(true);
  });

  it("closes on Escape", () => {
    let closed = false;
    render(<SearchModal open onClose={() => (closed = true)} />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(closed).toBe(true);
  });

  it("navigates to the active result on Enter", () => {
    render(<SearchModal open onClose={() => {}} />);
    fireEvent.change(screen.getByLabelText("Search the site"), { target: { value: "store" } });
    fireEvent.keyDown(window, { key: "Enter" });
    expect(push).toHaveBeenCalledWith("/store");
  });

  it("closes when the backdrop is clicked", () => {
    let closed = false;
    render(<SearchModal open onClose={() => (closed = true)} />);
    fireEvent.click(screen.getByRole("presentation"));
    expect(closed).toBe(true);
  });
});
