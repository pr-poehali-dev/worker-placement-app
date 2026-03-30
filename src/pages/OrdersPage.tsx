import { useState } from "react";
import Icon from "@/components/ui/icon";
import { orders } from "@/data/mockData";

const statusConfig = {
  active: { label: "Активный", color: "bg-blue-50 text-blue-700 border-blue-200" },
  pending: { label: "Ожидает", color: "bg-amber-50 text-amber-700 border-amber-200" },
  completed: { label: "Завершён", color: "bg-green-50 text-green-700 border-green-200" },
};

type Tab = "all" | "active" | "pending" | "completed";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filtered =
    activeTab === "all"
      ? orders
      : orders.filter((o) => o.status === activeTab);

  return (
    <div className="pb-20 bg-background min-h-screen">
      <div className="px-4 pt-10 pb-4 bg-white border-b border-border">
        <div className="flex items-center justify-between mb-4 animate-fade-in">
          <h1 className="text-xl font-bold">Мои заказы</h1>
          <button className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-2 rounded-lg">
            <Icon name="Plus" size={14} />
            Новый
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 animate-fade-in stagger-1">
          {([
            { id: "all", label: "Все" },
            { id: "active", label: "Активные" },
            { id: "pending", label: "Ожидают" },
            { id: "completed", label: "Завершены" },
          ] as { id: Tab; label: string }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="ClipboardList" size={40} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Заказов нет</p>
          </div>
        ) : (
          filtered.map((order, i) => {
            const status = statusConfig[order.status as keyof typeof statusConfig];
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-4 border border-border card-hover cursor-pointer animate-fade-in"
                style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-muted-foreground">{order.id}</span>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm text-foreground leading-snug">
                      {order.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{order.category}</p>
                  </div>
                  <p className="text-sm font-bold text-foreground">{order.price}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Calendar" size={12} />
                    <span>{order.date} · {order.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="MapPin" size={12} />
                    <span className="truncate">{order.address}</span>
                  </div>
                  {order.worker && (
                    <div className="flex items-center gap-2 text-xs text-foreground">
                      <Icon name="User" size={12} className="text-muted-foreground" />
                      <span>{order.worker}</span>
                    </div>
                  )}
                  {!order.worker && (
                    <div className="flex items-center gap-2 text-xs text-amber-600">
                      <Icon name="Clock" size={12} />
                      <span>Ищем мастера...</span>
                    </div>
                  )}
                </div>

                {order.status === "active" && (
                  <div className="mt-3 pt-3 border-t border-border flex gap-2">
                    <button className="flex-1 py-2 text-xs font-medium rounded-lg border border-border">
                      Чат с мастером
                    </button>
                    <button className="flex-1 py-2 text-xs font-medium rounded-lg bg-primary text-primary-foreground">
                      Детали заказа
                    </button>
                  </div>
                )}

                {order.status === "completed" && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <button className="w-full py-2 text-xs font-medium rounded-lg bg-secondary flex items-center justify-center gap-1.5">
                      <Icon name="Star" size={12} className="fill-amber-400 stroke-amber-400" />
                      Оставить отзыв
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* New order CTA */}
        <button className="w-full py-4 border-2 border-dashed border-border rounded-2xl flex flex-col items-center gap-1.5 text-muted-foreground hover:border-primary hover:text-primary transition-colors">
          <Icon name="Plus" size={20} />
          <span className="text-sm font-medium">Создать новый заказ</span>
        </button>
      </div>
    </div>
  );
}
