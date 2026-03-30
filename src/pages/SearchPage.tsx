import { useState } from "react";
import Icon from "@/components/ui/icon";
import WorkerCard from "@/components/WorkerCard";
import { categories, workers } from "@/data/mockData";

interface Worker {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: string;
  location: string;
  available: boolean;
  avatar: null;
  initials: string;
  tags: string[];
  experience: string;
  completedOrders: number;
}

interface SearchPageProps {
  onWorkerSelect: (worker: Worker) => void;
}

export default function SearchPage({ onWorkerSelect }: SearchPageProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"rating" | "price">("rating");

  const filtered = workers.filter((w) => {
    const matchSearch =
      !search ||
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.specialty.toLowerCase().includes(search.toLowerCase()) ||
      w.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat =
      !activeCategory ||
      w.tags.includes(categories.find((c) => c.id === activeCategory)?.name || "");
    return matchSearch && matchCat;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    return parseInt(a.price) - parseInt(b.price);
  });

  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Header */}
      <div className="px-4 pt-10 pb-4 bg-card border-b border-border sticky top-0 z-10">
        <h1 className="text-xl font-bold mb-3 animate-fade-in">Найти мастера</h1>

        {/* Search input */}
        <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-2.5 animate-fade-in stagger-1">
          <Icon name="Search" size={16} className="text-muted-foreground flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Услуга, имя мастера..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <Icon name="X" size={14} className="text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Categories scroll */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide animate-fade-in stagger-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !activeCategory
                ? "bg-foreground text-background"
                : "bg-secondary text-foreground"
            }`}
          >
            Все
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-foreground text-background"
                  : "bg-secondary text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Sort + count */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-muted-foreground">
            Найдено: <span className="font-semibold text-foreground">{sorted.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSortBy("rating")}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                sortBy === "rating"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-secondary text-foreground"
              }`}
            >
              По рейтингу
            </button>
            <button
              onClick={() => setSortBy("price")}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                sortBy === "price"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-secondary text-foreground"
              }`}
            >
              По цене
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-2">
          {sorted.length === 0 ? (
            <div className="text-center py-16">
              <Icon name="SearchX" size={40} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Мастеров не найдено</p>
              <p className="text-xs text-muted-foreground mt-1">Попробуйте изменить запрос</p>
            </div>
          ) : (
            sorted.map((worker, i) => (
              <div
                key={worker.id}
                style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
                className="animate-fade-in"
              >
                <WorkerCard worker={worker} onClick={() => onWorkerSelect(worker)} />
              </div>
            ))
          )}
        </div>

        {/* Location hint */}
        <button className="w-full mt-3 flex items-center justify-center gap-2 py-3 text-xs text-muted-foreground border border-dashed border-border rounded-xl">
          <Icon name="MapPin" size={14} />
          Указать район поиска
        </button>
      </div>
    </div>
  );
}