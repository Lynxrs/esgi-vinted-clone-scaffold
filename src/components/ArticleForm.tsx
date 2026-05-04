import { useState } from "react";
import {
  type ArticleFormData,
  CATEGORIES,
  CONDITIONS,
} from "../types/article";

type Props = {
  initialValues?: ArticleFormData;
  submitLabel: string;
  isSubmitting?: boolean;
  apiError?: string | null;
  onSubmit: (data: ArticleFormData) => void;
};

const EMPTY: ArticleFormData = {
  title: "",
  description: "",
  price: 0,
  category: "",
  size: "",
  condition: "",
  imageUrl: "",
};

type Errors = Partial<Record<keyof ArticleFormData, string>>;

export default function ArticleForm({
  initialValues,
  submitLabel,
  isSubmitting,
  apiError,
  onSubmit,
}: Props) {
  const [values, setValues] = useState<ArticleFormData>(initialValues ?? EMPTY);
  const [errors, setErrors] = useState<Errors>({});

  // TODO: fonction validate(values) qui retourne un objet Errors
  // - title: requis, 3 à 100 caractères
  // - description: requis, 10 à 1000 caractères
  // - price: > 0
  // - category, size, condition, imageUrl: requis
  function validate(_v: ArticleFormData): Errors {
    return {};
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSubmit(values);
  }

  // TODO: helper pour mettre à jour un champ
  // function setField<K extends keyof ArticleFormData>(key: K, value: ArticleFormData[K]) { ... }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* TODO: champ title (input text)
          - value={values.title}
          - onChange -> setField("title", e.target.value)
          - afficher errors.title sous le champ */}

      {/* TODO: champ description (textarea) */}

      {/* TODO: champ price (input number, step="0.01")
          - attention : e.target.value est string, convertir en Number */}

      {/* TODO: champ category (select) — itérer sur CATEGORIES */}

      {/* TODO: champ size (input text) */}

      {/* TODO: champ condition (select) — itérer sur CONDITIONS */}

      {/* TODO: champ imageUrl (input url) */}

      {apiError && <p className="text-red-600 text-sm">{apiError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-teal-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? "Envoi..." : submitLabel}
      </button>
    </form>
  );
}
