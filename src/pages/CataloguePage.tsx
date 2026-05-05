import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "../types/article";
import { CATEGORIES, CONDITIONS } from "../types/article";
import { api } from "../services/api.ts";
import ArticleCard from "../components/ArticleCard.tsx";

type Filters = {
  search: string;
  category: string;
  condition: string;
  priceMin: string;
  priceMax: string;
  sort: string;
};

function buildUrl(filters: Filters): string {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.condition) params.set("condition", filters.condition);
  if (filters.priceMin) params.set("priceMin", filters.priceMin);
  if (filters.priceMax) params.set("priceMax", filters.priceMax);
  if (filters.sort) params.set("sort", filters.sort);
  const qs = params.toString();
  return `/api/articles${qs ? `?${qs}` : ""}`;
}

export default function CataloguePage() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
    condition: "",
    priceMin: "",
    priceMax: "",
    sort: "",
  });

  const {
    data: articles,
    isLoading,
    error,
  } = useQuery<Article[]>({
    queryKey: ["articles", filters],
    queryFn: () => api.get<Article[]>(buildUrl(filters)),
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Rechercher..."
          className="border border-gray-300 rounded-lg px-3 py-2 flex-1 min-w-48 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="">Toutes catégories</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <select
          name="condition"
          value={filters.condition}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="">Tous états</option>
          {CONDITIONS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="priceMin"
          value={filters.priceMin}
          onChange={handleChange}
          placeholder="Prix min"
          className="border border-gray-300 rounded-lg px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <input
          type="number"
          name="priceMax"
          value={filters.priceMax}
          onChange={handleChange}
          placeholder="Prix max"
          className="border border-gray-300 rounded-lg px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <option value="">Plus récent</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
        </select>
      </div>

      {isLoading && (
        <p className="text-center text-gray-500 py-12">Chargement en cours...</p>
      )}

      {error && (
        <p className="text-center text-red-500 py-12">
          Une erreur est survenue lors du chargement.
        </p>
      )}

      {!isLoading && !error && articles?.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          Aucun article ne correspond à votre recherche.
        </p>
      )}

      {!isLoading && !error && articles && articles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
