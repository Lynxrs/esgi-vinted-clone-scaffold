import { type ChangeEvent, useState } from "react";
import { articleService } from "../services/articleService.ts";

export type ArticleFormData = {
  title: string;
  description: string;
  price: number;
  category: string;
  size: string;
  condition: string;
  imageUrl: string;
};

const CATEGORIES = [
  { id: "tops", label: "Hauts" },
  { id: "bottoms", label: "Bas" },
  { id: "shoes", label: "Chaussures" },
  { id: "coats", label: "Manteaux" },
  { id: "accessories", label: "Accessoires" },
  { id: "sportswear", label: "Sportswear" },
];

const CONDITIONS = [
  { value: "neuf_avec_etiquette", label: "Neuf avec étiquette" },
  { value: "neuf_sans_etiquette", label: "Neuf sans étiquette" },
  { value: "tres_bon_etat", label: "Très bon état" },
  { value: "bon_etat", label: "Bon état" },
  { value: "satisfaisant", label: "Satisfaisant" },
];

export default function PublishPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    description: "",
    price: 0,
    category: "",
    size: "",
    condition: "",
    imageUrl: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newArticle = await articleService.create(formData);
      console.log("Succès !", newArticle);
      alert("Article publié avec succès !");
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Publiez votre article
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="bg-white p-6 rounded-sm shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <label className="text-gray-600 w-48 font-medium">
                URL de l'image
              </label>
              <input
                type="text"
                name="imageUrl"
                className="flex-1 p-2 border-b border-gray-200 focus:border-[#007782] outline-none transition-colors"
                onChange={handleChange}
                required
              />
            </div>
          </section>

          <section className="bg-white rounded-sm shadow-sm border border-gray-200 divide-y divide-gray-100">
            <div className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <label className="text-gray-600 w-48 font-medium">Titre</label>
                <input
                  type="text"
                  name="title"
                  className="flex-1 p-2 border-b border-gray-200 focus:border-[#007782] outline-none"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-4">
                <label className="text-gray-600 w-48 font-medium">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  className="flex-1 p-2 border border-gray-200 rounded focus:border-[#007782] outline-none"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <label className="text-gray-600 w-48 font-medium">
                  Catégorie
                </label>
                <select
                  name="category"
                  className="flex-1 p-2 bg-transparent border-b border-gray-200 outline-none cursor-pointer appearance-none"
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <label className="text-gray-600 w-48 font-medium">Taille</label>
                <input
                  type="text"
                  name="size"
                  className="flex-1 p-2 border-b border-gray-200 focus:border-[#007782] outline-none"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <label className="text-gray-600 w-48 font-medium">État</label>
                <select
                  name="condition"
                  className="flex-1 p-2 bg-transparent border-b border-gray-200 outline-none cursor-pointer appearance-none"
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez l'état</option>
                  {CONDITIONS.map((cond) => (
                    <option key={cond.value} value={cond.value}>
                      {cond.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <label className="text-gray-600 w-48">
                  Prix (€)
                </label>
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    className="w-32 p-2 border-b border-gray-200 focus:border-[#007782] outline-none text-right font-medium"
                    onChange={handleChange}
                    required
                  />
                  <span className="text-gray-500 font-medium">€</span>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <button
              type="submit"
              className="bg-[#007782] text-white px-4 py-3 rounded-sm font-medium hover:bg-[#00666e] transition-all w-full md:w-auto shadow-sm cursor-pointer">
              {loading ? "Publication..." : "Publier l'article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
