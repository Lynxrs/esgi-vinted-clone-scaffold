import { api } from "./api";
import type { Article, ArticleFormData } from "../types/article";

export const articleService = {
  /**
   * Crée un nouvel article
   * Note : userName est ajouté automatiquement par ton utilitaire api.post
   */
  create: (data: ArticleFormData) => {
    return api.post<Article>(
      "/api/articles",
      data as unknown as Record<string, unknown>,
    );
  },
};
