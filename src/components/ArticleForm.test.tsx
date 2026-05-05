import { render, screen, fireEvent } from "@testing-library/react";
import ArticleForm from "./ArticleForm";
import { expect, it, describe, vi } from "vitest";

describe("ArticleForm", () => {
  it("affiche des messages d'erreur lors de la soumission d'un formulaire vide", async () => {
    const handleSubmit = vi.fn();
    render(
      <ArticleForm
        onSubmit={handleSubmit}
        submitLabel="Ajouter"
        isSubmitting={false}
      />,
    );

    const submitButton = screen.getByRole("button", { name: /Ajouter/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(
        /Le titre doit contenir entre 3 et 100 caractères/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/La catégorie est requise/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Le prix doit être supérieur à 0/i),
    ).toBeInTheDocument();

    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
