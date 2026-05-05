import { useEffect, useState } from "react";
import type { Article } from "../types/article.ts";
import { api } from "../services/api.ts";
import { useCurrentUserId } from "../hooks/useCurrentUserId.ts";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard.tsx";

export default function MyArticlesPage() {
  const [ articles, setArticles ] = useState<Article[]>([]);
  const [ error, setError ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState<boolean>(true);
  const userid = useCurrentUserId();

  async function fetchArticles() {
    try{
      const response = await api.get<Article[]>(`/api/users/${userid}/articles`);
      setArticles(response);
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue Veuillez actualiser la page")
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    api.delete(`/api/articles/${id}`);
    setArticles(articles.filter((article) => article.id !== id));
  }

  useEffect(() => {
    fetchArticles();
  },[])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mes annonces</h1>
      {loading && (<p>Chargement...</p>)}
      {error && (<p className="text-red-600">{error}</p>)}
      {articles.length === 0 && !loading && (
        <p className="text-gray-500">
          Vous n'avez pas encore d'annonces.{" "}
          <Link to="/publish" className="text-teal-600 hover:underline">
            Publier une annonce
          </Link>
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        { !error && !loading && articles.map((article) => (
          <div key={article.id} className="flex flex-col">
            <ArticleCard article={article} />
            <div className="flex gap-3 mt-2 justify-end">
              <Link
                to={`/articles/${article.id}/edit`}
                className="text-gray-600 hover:underline text-sm"
              >
                Modifier
              </Link>
              <button
                onClick={() => handleDelete(article.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
