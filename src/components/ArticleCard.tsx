import { Link } from "react-router-dom";
import type { Article } from "../types/article";
import { CATEGORIES, CONDITIONS } from "../types/article";
import { favouriteService } from "../services/favouriteService.ts";
import { useState, type MouseEvent, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUserId } from "../hooks/useCurrentUserId.ts";

type Props = {
  article: Article;
  isFavorite?: boolean;
};

function formatPrice(price: number): string {
  return (
    price.toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €"
  );
}

export default function ArticleCard({ article, isFavorite }: Props) {
  const [isFav, setIsFav] = useState(isFavorite);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsFav(isFavorite);
  }, [isFavorite]);

  const currentUserId = useCurrentUserId();
  const isOwner = currentUserId === article.userId;

  const handleToggleFavorite = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOwner) return;

    try {
      if (isFav) {
        await favouriteService.remove(article.id);
      } else {
        await favouriteService.add(article.id);
      }
      queryClient.invalidateQueries({ queryKey: ["favorites"] })
      setIsFav(!isFav);
    } catch (err) {
      console.error("Erreur toggle favori", err);
    }
  };

  return (
    <Link to={`/articles/${article.id}`}
      className="relative bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden group">

      {!isOwner && (
        <button
          type="button"
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md z-10 hover:scale-110 transition-transform cursor-pointer"
          aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}>
          {isFav ? "❤️" : "🤍"}
        </button>
      )}

      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-3">
        <h2 className="font-semibold text-gray-800 truncate">
          {article.title}
        </h2>
        <p className="text-teal-600 font-bold mt-1">
          {formatPrice(article.price)}
        </p>

        <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
          <span>
            {CATEGORIES.find((c) => c.id === article.category)?.label ??
              article.category}
          </span>
          <span>
            {CONDITIONS.find((c) => c.value === article.condition)?.label ??
              article.condition}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">{article.userName}</p>
      </div>
    </Link>
  );
}
