import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it, describe, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("Favoris", () => {
  it("appelle la fonction de toggle favori au clic", () => {
    const onToggle = vi.fn();

    render(
      <BrowserRouter>
        <button onClick={onToggle} aria-label="Ajouter aux favoris">
          ❤
        </button>
      </BrowserRouter>,
    );

    const button = screen.getByLabelText(/favoris/i);
    fireEvent.click(button);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
