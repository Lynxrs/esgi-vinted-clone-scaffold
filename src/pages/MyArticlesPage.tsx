import { useEffect, useState } from "react";
import type { Article } from "../types/article.ts";
import { api } from "../services/api.ts";
import { useCurrentUserId } from "../hooks/useCurrentUserId.ts";
import { Link } from "react-router-dom";

export default function MyArticlesPage() {
  const [ articles, setArticles ] = useState<Article[]>([]);
  const [ error, setError ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState<boolean>(true);
  const userid = useCurrentUserId();
  async function fetchArticles() {
    let response;
    try{
      response = await api.get<Article[]>(`/api/users/${userid}/articles`);
      setArticles(response);
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue Veuillez actualiser la page")
      setLoading(false);
    }
    console.log(response);

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

      <ul className="space-y-4">
        { !error &&!loading && articles.map((article) => (
          <li
            key={article.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-500">{article.price} €</p>
            </div>
            <div className="flex gap-3">
              <Link
                to={`/articles/${article.id}`}
                className="text-teal-600 hover:underline text-sm"
              >
                Voir
              </Link>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
