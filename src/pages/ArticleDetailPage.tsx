import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Article } from "../types/article";
import { api } from "../services/api.ts";

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery<Article>({
    queryKey: ["article", id],
    queryFn: () => api.get<Article>(`/api/articles/${id}`),
    enabled: !!id,
  });

  function formatPrice(num: number): string {
    return num.toLocaleString("fr-FR", {}) + "€";
  }

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("fr-FR");
  }

  return (
    <div>
      <Link to="/" className="text-teal-600 hover:underline">
        ← Retour au catalogue
      </Link>

      {isLoading && (
        <div>
          <p> Chargement en cours... </p>
        </div>
      )}

      {error && (
        <div>
          <p>Une Erreur est survenue lors du chargement</p>
        </div>
      )}
      {!error && !isLoading && article && (
        <div>
          <img src={article.imageUrl} alt={article.title} />

          <h1>{article.title}</h1>
          <span>{article.category}</span>
          <h3> {formatPrice(article.price)}</h3>
          <h3>{article.description}</h3>

          <h5>
            {" "}
            Posté le {formatDate(article.createdAt)}, par {article.userName}{" "}
          </h5>
        </div>
      )}
    </div>
  );
}
