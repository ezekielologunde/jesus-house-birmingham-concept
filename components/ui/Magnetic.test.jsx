import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Magnetic } from "./Magnetic";

describe("Magnetic", () => {
  it("renders its children", () => {
    render(
      <Magnetic>
        <button type="button">Click me</button>
      </Magnetic>
    );
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("tracks the pointer via motion values, not React state — mousemove never re-renders the children", () => {
    let renderCount = 0;
    function Probe() {
      renderCount += 1;
      return <button type="button">Move me</button>;
    }

    const { container } = render(
      <Magnetic>
        <Probe />
      </Magnetic>
    );
    const countAfterMount = renderCount;
    const wrapper = container.querySelector("span");

    fireEvent.mouseMove(wrapper, { clientX: 40, clientY: 30 });
    fireEvent.mouseMove(wrapper, { clientX: 55, clientY: 62 });
    fireEvent.mouseMove(wrapper, { clientX: 10, clientY: 5 });
    fireEvent.mouseLeave(wrapper);

    expect(renderCount).toBe(countAfterMount);
  });
});
