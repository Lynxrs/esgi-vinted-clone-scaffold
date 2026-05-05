import { api } from "./api";
import type { Article } from "../types/article.ts";

export const favouriteService = {
  remove: (articleId: string) => {
    return api.delete<void>(`/api/favorites/${articleId}`);
  },

  getFavorites: () => {
    return api.get<Article[]>("/api/favorites");
  },

  add: (articleId: string) => {
    return api.post<void>(`/api/favorites/${articleId}`, {});
  }
};
