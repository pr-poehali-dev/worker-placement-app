import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { orders, workers } from "@/data/mockData";

interface MapPageProps {
  onBack: () => void;
}

const mapPoints = [
  { id: 1, type: "order", x: 35, y: 28, label: "Замена смесителя", status: "active" },
  { id: 2, type: "order", x: 62, y: 45, label: "Установка розеток", status: "pending" },
  { id: 3, type: "worker", x: 45, y: 55, label: "Алексей М.", rating: 4.9 },
  { id: 4, type: "worker", x: 72, y: 30, label: "Дмитрий К.", rating: 4.7 },
  { id: 5, type: "worker", x: 25, y: 65, label: "Сергей И.", rating: 4.8 },
  { id: 6, type: "worker", x: 55, y: 72, label: "Николай П.", rating: 4.6 },
];

export default function MapPage({ onBack }: MapPageProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "orders" | "workers">("all");

  const filtered = mapPoints.filter((p) => {
    if (filter === "all") return true;
    if (filter === "orders") return p.type === "order";
    return p.type === "worker";
  });

  const selectedPoint = mapPoints.find((p) => p.id === selected);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-3 bg-white border-b border-border z-20 relative">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"
        >
          <Icon name="ArrowLeft" size={16} />
        </button>
        <h1 className="font-semibold text-base flex-1">Карта заказов</h1>
        <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          <Icon name="LocateFixed" size={16} />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 px-4 py-2.5 bg-white border-b border-border z-10">
        {([
          { id: "all", label: "Все", icon: "Layers" },
          { id: "orders", label: "Заказы", icon: "ClipboardList" },
          { id: "workers", label: "Мастера", icon: "Users" },
        ] as { id: "all" | "orders" | "workers"; label: string; icon: string }[]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === tab.id
                ? "bg-foreground text-background"
                : "bg-secondary text-foreground"
            }`}
          >
            <Icon name={tab.icon} size={12} fallback="Circle" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Map area */}
      <div className="flex-1 relative bg-[#f0ede8] overflow-hidden">
        {/* Grid pattern for map feel */}
        <div className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Faux roads */}
        <div className="absolute inset-0">
          <div className="absolute top-[20%] left-0 right-0 h-[2px] bg-white/80" />
          <div className="absolute top-[50%] left-0 right-0 h-[3px] bg-white/90" />
          <div className="absolute top-[75%] left-0 right-0 h-[2px] bg-white/80" />
          <div className="absolute top-0 bottom-0 left-[30%] w-[3px] bg-white/90" />
          <div className="absolute top-0 bottom-0 left-[60%] w-[2px] bg-white/80" />
          <div className="absolute top-0 bottom-0 left-[80%] w-[2px] bg-white/70" />
          <div className="absolute top-[35%] left-[10%] right-[30%] h-[2px] bg-white/60 rotate-[15deg]" />
          <div className="absolute top-[60%] left-[40%] right-[10%] h-[2px] bg-white/60 -rotate-[8deg]" />
        </div>

        {/* City label */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/50 z-10">
          <p className="text-[10px] font-mono text-muted-foreground">Москва · Центр</p>
        </div>

        {/* Map pins */}
        {filtered.map((point) => {
          const isSelected = selected === point.id;
          return (
            <button
              key={point.id}
              onClick={() => setSelected(isSelected ? null : point.id)}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              {/* Pulse ring */}
              {point.type === "order" && point.status === "active" && (
                <div className="absolute inset-0 w-10 h-10 -translate-x-1 -translate-y-1 rounded-full bg-blue-400/20 animate-ping" />
              )}

              <div
                className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                  isSelected ? "scale-125" : "hover:scale-110"
                } ${
                  point.type === "order"
                    ? point.status === "active"
                      ? "bg-blue-500"
                      : "bg-amber-500"
                    : "bg-foreground"
                }`}
              >
                <Icon
                  name={point.type === "order" ? "ClipboardList" : "User"}
                  size={14}
                  className="text-white"
                />
              </div>

              {/* Label tooltip */}
              {isSelected && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-xl px-3 py-2 shadow-lg border border-border whitespace-nowrap animate-scale-in z-20 min-w-[120px]">
                  <p className="text-xs font-semibold text-foreground">{point.label}</p>
                  {point.type === "worker" && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Icon name="Star" size={10} className="fill-amber-400 stroke-amber-400" />
                      <span className="text-[10px] text-muted-foreground">{point.rating}</span>
                    </div>
                  )}
                  {point.type === "order" && (
                    <span className={`text-[10px] font-medium ${
                      point.status === "active" ? "text-blue-600" : "text-amber-600"
                    }`}>
                      {point.status === "active" ? "Активный" : "Ожидает"}
                    </span>
                  )}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-border rotate-45 -mt-1" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom info panel */}
      <div className="bg-white border-t border-border px-4 py-4 space-y-3 z-20 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              Активные заказы
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              Ожидают
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-foreground" />
              Мастера
            </span>
          </div>
        </div>

        {selectedPoint ? (
          <div className="bg-muted rounded-xl p-3 animate-scale-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{selectedPoint.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {selectedPoint.type === "order" ? "Заказ · Москва" : "Мастер · Доступен"}
                </p>
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-lg">
                {selectedPoint.type === "order" ? "Подробнее" : "Связаться"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center">
            Нажмите на метку, чтобы увидеть детали
          </p>
        )}
      </div>
    </div>
  );
}
