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


  function validate(_v: ArticleFormData): Errors {
    const errs: Errors = {};
    if (_v.title.length < 3 || _v.title.length > 100)
      errs.title = "Le titre doit contenir entre 3 et 100 caractères.";
    if (_v.description.length < 10 || _v.description.length > 1000)
      errs.description = "La description doit contenir entre 10 et 1000 caractères.";
    if (_v.price <= 0)
      errs.price = "Le prix doit être supérieur à 0.";
    if (!_v.category)
      errs.category = "La catégorie est requise.";
    if (!_v.size)
      errs.size = "La taille est requise.";
    if (!_v.condition)
      errs.condition = "L'état est requis.";
    if (!_v.imageUrl)
      errs.imageUrl = "L'URL de l'image est requise.";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSubmit(values);
  }

  function setField<K extends keyof ArticleFormData>(key: K, value: ArticleFormData[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Titre</label>
        <input
          type="text"
          value={values.title}
          onChange={(e) => setField("title", e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={values.description}
          onChange={(e) => setField("description", e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={4}
        />
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Prix (€)</label>
        <input
          type="number"
          step="0.01"
          value={values.price}
          onChange={(e) => setField("price", Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        />
        {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Catégorie</label>
        <select
          value={values.category}
          onChange={(e) => setField("category", e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">-- Choisir --</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Taille</label>
        <input
          type="text"
          value={values.size}
          onChange={(e) => setField("size", e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        {errors.size && <p className="text-red-600 text-sm mt-1">{errors.size}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">État</label>
        <select
          value={values.condition}
          onChange={(e) => setField("condition", e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">-- Choisir --</option>
          {CONDITIONS.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        {errors.condition && <p className="text-red-600 text-sm mt-1">{errors.condition}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">URL de l'image</label>
        <input
          type="url"
          value={values.imageUrl}
          onChange={(e) => setField("imageUrl", e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        {errors.imageUrl && <p className="text-red-600 text-sm mt-1">{errors.imageUrl}</p>}
      </div>

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
