import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ArticleCard from "./ArticleCard"; // Import par défaut
import type { Article } from "../types/article";
import { expect, it, describe } from "vitest";

// Initialisation du QueryClient pour le test
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const mockArticle: Article = {
  id: "1",
  title: "Veste en jean",
  description: "Superbe veste",
  price: 25.5,
  category: "tops",
  condition: "tres_bon_etat",
  size: "M",
  imageUrl: "https://placeholder.com/image.jpg",
  userName: "Test User",
  userId: "user123",
  createdAt: "2026-05-01T10:00:00.000Z",
};

describe("ArticleCard", () => {
  it("affiche le titre et le prix formaté correctement", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ArticleCard article={mockArticle} />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText("Veste en jean")).toBeInTheDocument();
    expect(screen.getByText(/25,50/)).toBeInTheDocument();
    expect(screen.getByText(/€/)).toBeInTheDocument();
  });
});
