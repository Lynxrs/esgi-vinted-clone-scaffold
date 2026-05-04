import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { useCurrentUserId } from "../hooks/useCurrentUserId";
import type { Article, ArticleFormData } from "../types/article";
import ArticleForm from "../components/ArticleForm";

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = useCurrentUserId();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery<Article>({
    queryKey: ["article", id],
    queryFn: async () => {
      return api.get(`/api/articles/${id}`);
    },
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: async (_data: ArticleFormData): Promise<Article> => {
      const temp = {
        ..._data,
      };
      api.put(`/articles/${id}`, temp);
      return { createdAt: "", id: "", userId: "", userName: "", ...temp};
    },

    onSuccess: () => {
      void queryClient;
      void navigate;
    },
  });

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">Erreur : {error.message}</p>;
  if (!article) return <p>Article introuvable.</p>;

  if (article.userId !== userId) {
    return (
      <p className="text-red-600">Vous ne pouvez pas modifier cette annonce.</p>
    );
  }

  const initialValues: ArticleFormData = {
    title: article.title,
    description: article.description,
    price: article.price,
    category: article.category,
    size: article.size,
    condition: article.condition,
    imageUrl: article.imageUrl,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Modifier l'annonce</h1>
      <ArticleForm
        initialValues={initialValues}
        submitLabel="Enregistrer"
        isSubmitting={mutation.isPending}
        apiError={mutation.error?.message ?? null}
        onSubmit={(data) => mutation.mutate(data)}
      />
    </div>
  );
}
