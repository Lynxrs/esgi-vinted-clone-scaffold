import { useState } from "react";
import { type ArticleFormData, CATEGORIES, CONDITIONS } from "../types/article";

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
    if (_v.price <= 0) errs.price = "Le prix doit être supérieur à 0.";
    if (!_v.category) errs.category = "La catégorie est requise.";
    if (!_v.size) errs.size = "La taille est requise.";
    if (!_v.condition) errs.condition = "L'état est requis.";
    if (!_v.imageUrl) errs.imageUrl = "L'URL de l'image est requise.";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSubmit(values);
  }

  function setField<K extends keyof ArticleFormData>(
    key: K,
    value: ArticleFormData[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <label className="text-gray-600 w-48 font-medium mt-2">
            URL de l'image
          </label>
          <div className="flex-1">
            <input
              type="url"
              value={values.imageUrl}
              onChange={(e) => setField("imageUrl", e.target.value)}
              className="w-full p-2 border-b border-gray-200 focus:border-[#007782] outline-none transition-colors"
              placeholder="https://..."
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white rounded-sm shadow-sm border border-gray-200 divide-y divide-gray-100">
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <label className="text-gray-600 w-48 font-medium mt-2">Titre</label>
            <div className="flex-1">
              <input
                type="text"
                value={values.title}
                onChange={(e) => setField("title", e.target.value)}
                className="w-full p-2 border-b border-gray-200 focus:border-[#007782] outline-none transition-colors"
                placeholder="ex: Chemise en lin"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <label className="text-gray-600 w-48 font-medium mt-2">
              Description
            </label>
            <div className="flex-1">
              <textarea
                rows={4}
                value={values.description}
                onChange={(e) => setField("description", e.target.value)}
                className="w-full p-2 border border-gray-200 rounded focus:border-[#007782] outline-none transition-colors"
                placeholder="Décrivez votre article..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <label className="text-gray-600 w-48 font-medium mt-2">
              Catégorie
            </label>
            <div className="flex-1">
              <select
                value={values.category}
                onChange={(e) => setField("category", e.target.value)}
                className="w-full p-2 bg-transparent border-b border-gray-200 focus:border-[#007782] outline-none cursor-pointer appearance-none transition-colors"
              >
                <option value="">Sélectionnez une catégorie</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <label className="text-gray-600 w-48 font-medium mt-2">
              Taille
            </label>
            <div className="flex-1">
              <input
                type="text"
                value={values.size}
                onChange={(e) => setField("size", e.target.value)}
                className="w-full p-2 border-b border-gray-200 focus:border-[#007782] outline-none transition-colors"
                placeholder="ex: M, 38, Unique..."
              />
              {errors.size && (
                <p className="text-red-500 text-sm mt-1">{errors.size}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <label className="text-gray-600 w-48 font-medium mt-2">État</label>
            <div className="flex-1">
              <select
                value={values.condition}
                onChange={(e) => setField("condition", e.target.value)}
                className="w-full p-2 bg-transparent border-b border-gray-200 focus:border-[#007782] outline-none cursor-pointer appearance-none transition-colors"
              >
                <option value="">Sélectionnez l'état</option>
                {CONDITIONS.map((cond) => (
                  <option key={cond.value} value={cond.value}>
                    {cond.label}
                  </option>
                ))}
              </select>
              {errors.condition && (
                <p className="text-red-500 text-sm mt-1">{errors.condition}</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <label className="text-gray-600 w-48 font-medium mt-2">
              Prix (€)
            </label>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={values.price === 0 ? "" : values.price}
                  onChange={(e) => setField("price", Number(e.target.value))}
                  className="w-32 p-2 border-b border-gray-200 focus:border-[#007782] outline-none text-right font-medium transition-colors"
                  placeholder="0.00"
                />
                <span className="text-gray-500 font-medium">€</span>
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {apiError && (
        <div className="bg-red-50 text-red-600 p-3 rounded text-sm border border-red-200">
          {apiError}
        </div>
      )}

      <div className="pt-4 flex flex-col md:flex-row justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#007782] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#00666e] transition-all w-full md:w-auto shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Envoi en cours..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
