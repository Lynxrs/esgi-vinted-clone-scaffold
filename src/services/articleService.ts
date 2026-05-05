import { api } from "./api";
import type { Article, ArticleFormData } from "../types/article";

export const articleService = {
  create: (data: ArticleFormData) => {
    return api.post<Article>(
      "/api/articles",
      data as unknown as Record<string, unknown>,
    );
  },
};
