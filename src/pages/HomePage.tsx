import Icon from "@/components/ui/icon";
import WorkerCard from "@/components/WorkerCard";
import { categories, workers } from "@/data/mockData";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Header */}
      <div className="px-4 pt-10 pb-6 bg-card border-b border-border">
        <div className="flex items-start justify-between mb-4 animate-fade-in">
          <div>
            <p className="text-xs text-muted-foreground font-mono">Москва</p>
            <h1 className="text-2xl font-bold text-foreground leading-tight">
              Мастер
            </h1>
          </div>
          <button
            className="relative w-9 h-9 rounded-xl bg-secondary flex items-center justify-center"
            onClick={() => onNavigate("chat")}
          >
            <Icon name="Bell" size={18} className="text-foreground" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>

        {/* Search bar */}
        <div className="flex gap-2 animate-fade-in stagger-1">
          <button
            className="flex-1 flex items-center gap-3 bg-muted rounded-xl px-4 py-3 text-left"
            onClick={() => onNavigate("search")}
          >
            <Icon name="Search" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Найти мастера или услугу...</span>
          </button>
          <button
            className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center flex-shrink-0"
            onClick={() => onNavigate("map")}
          >
            <Icon name="Map" size={18} className="text-background" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-6">
        {/* Banner */}
        <div className="bg-foreground text-background dark:bg-card dark:text-foreground dark:border dark:border-border rounded-2xl p-5 animate-fade-in stagger-2">
          <p className="text-xs font-mono text-background/50 dark:text-muted-foreground mb-1">Специальное предложение</p>
          <h2 className="text-lg font-bold leading-snug mb-3">
            Первый заказ<br />со скидкой 15%
          </h2>
          <button
            className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg"
            onClick={() => onNavigate("search")}
          >
            Найти мастера →
          </button>
        </div>

        {/* Categories */}
        <div className="animate-fade-in stagger-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold">Категории</h2>
            <button
              className="text-xs text-primary font-medium"
              onClick={() => onNavigate("search")}
            >
              Все
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                className="flex flex-col items-center gap-1.5 p-3 bg-card rounded-xl border border-border card-hover"
                style={{ animationDelay: `${i * 0.04}s` }}
                onClick={() => onNavigate("search")}
              >
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon name={cat.icon} size={18} className="text-foreground" fallback="Wrench" />
                </div>
                <span className="text-[10px] text-foreground font-medium text-center leading-tight">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Top workers */}
        <div className="animate-fade-in stagger-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold">Лучшие мастера</h2>
            <button
              className="text-xs text-primary font-medium"
              onClick={() => onNavigate("search")}
            >
              Все
            </button>
          </div>
          <div className="space-y-2">
            {workers.slice(0, 3).map((worker) => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                onClick={() => onNavigate("search")}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 animate-fade-in stagger-5 pb-2">
          {[
            { value: "370+", label: "Мастеров" },
            { value: "2 400+", label: "Заказов" },
            { value: "4.8", label: "Рейтинг" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl p-4 border border-border text-center"
            >
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}