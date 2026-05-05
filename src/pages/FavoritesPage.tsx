import { favouriteService } from "../services/favouriteService.ts";
import ArticleCard from "../components/ArticleCard.tsx";
import type { Article } from "../types/article.ts";
import { useQuery } from "@tanstack/react-query";

export default function FavoritesPage() {
  const {
    data: favorites = [],
    isLoading,
    error,
  } = useQuery<Article[]>({
    queryKey: ["favorites"],
    queryFn: () => favouriteService.getFavorites(),
  });

  if (isLoading)
    return <div className="p-20 text-center text-gray-400">Chargement...</div>;

  if (error)
    return (
      <div className="p-20 text-center text-red-500">
        Une erreur est survenue lors du chargement.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-[#fbfbfb]">
      <header className="mb-10 flex items-baseline gap-3">
        <h1 className="text-3xl font-bold text-gray-900">Mes favoris</h1>
        <span className="text-lg text-[#007782] font-medium">
          {favorites.length} articles
        </span>
      </header>

      {favorites.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl py-20 text-center">
          <p className="text-gray-400 text-lg">
            Aucun coup de coeur pour le moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((article) => (
            <ArticleCard key={article.id} article={article} isFavorite={true} />
          ))}
        </div>
      )}
    </div>
  );
}
