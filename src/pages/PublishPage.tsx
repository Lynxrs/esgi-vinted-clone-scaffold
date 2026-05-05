import { useState } from "react";
import { articleService } from "../services/articleService.ts";
import ArticleForm from "../components/ArticleForm.tsx";
import { useNavigate } from "react-router-dom";
import type { ArticleFormData } from "../types/article.ts";

export default function PublishPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      const newArticle = await articleService.create(data);
      alert("Article publié avec succès !");
      navigate(`/articles/${newArticle.id}`);
    } catch (error) {
      console.error(error);
      setApiError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de la publication.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Publiez votre article
        </h1>

        <ArticleForm
          submitLabel="Publier l'article"
          isSubmitting={isSubmitting}
          apiError={apiError}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
