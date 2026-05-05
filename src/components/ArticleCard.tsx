import { Link } from "react-router-dom";
import type { Article } from "../types/article";
import { CATEGORIES, CONDITIONS } from "../types/article";

type Props = {
  article: Article;
};

function formatPrice(price: number): string {
  return (
    price.toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €"
  );
}

export default function ArticleCard({ article }: Props) {
  return (
    <Link
      to={`/articles/${article.id}`}
      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden"
    >
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-3">
        <h2 className="font-semibold text-gray-800 truncate">{article.title}</h2>
        <p className="text-teal-600 font-bold mt-1">{formatPrice(article.price)}</p>
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
