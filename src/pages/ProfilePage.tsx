import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";

const profileMenuItems = [
  { icon: "ClipboardList", label: "Мои заказы", badge: "3" },
  { icon: "Star", label: "Мои отзывы", badge: null },
  { icon: "CreditCard", label: "Оплата и история", badge: null },
  { icon: "Bell", label: "Уведомления", badge: null },
  { icon: "Shield", label: "Безопасность", badge: null },
  { icon: "HelpCircle", label: "Помощь", badge: null },
];

interface ProfilePageProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function ProfilePage({ theme, onToggleTheme }: ProfilePageProps) {
  const [isWorker, setIsWorker] = useState(false);
  const [notif, setNotif] = useState(true);

  return (
    <div className="pb-20 bg-background min-h-screen">
      <div className="px-4 pt-10 pb-6 bg-card border-b border-border">
        <h1 className="text-xl font-bold mb-5 animate-fade-in">Профиль</h1>

        {/* Avatar + info */}
        <div className="flex items-center gap-4 animate-fade-in stagger-1">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center font-bold text-xl text-foreground">
              ИП
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary border-2 border-card flex items-center justify-center">
              <Icon name="Camera" size={10} className="text-primary-foreground" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg">Иван Петров</h2>
            <p className="text-sm text-muted-foreground">+7 (999) 123-45-67</p>
            <p className="text-xs text-muted-foreground">ivan@email.ru</p>
          </div>
          <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <Icon name="Pencil" size={14} />
          </button>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-4">
        {/* Mode switcher */}
        <div className="bg-card rounded-2xl p-4 border border-border animate-fade-in stagger-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Режим исполнителя</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isWorker ? "Вы принимаете заказы" : "Вы в режиме заказчика"}
              </p>
            </div>
            <Switch
              checked={isWorker}
              onCheckedChange={setIsWorker}
            />
          </div>

          {isWorker && (
            <div className="mt-4 pt-4 border-t border-border space-y-3 animate-scale-in">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Статус</p>
                <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Принимаю заказы
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Заработано сегодня</p>
                <p className="text-sm font-bold">4 800 ₽</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Мой рейтинг</p>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={12} className="fill-amber-400 stroke-amber-400" />
                  <span className="text-sm font-bold">4.9</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 animate-fade-in stagger-2">
          {[
            { value: "12", label: "Заказов" },
            { value: "4.8", label: "Рейтинг" },
            { value: "890 дн", label: "С нами" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl p-3 border border-border text-center"
            >
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Theme + Notifications */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden animate-fade-in stagger-3">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <Icon name={theme === "dark" ? "Moon" : "Sun"} size={15} />
              </div>
              <div>
                <p className="text-sm font-medium">Тёмная тема</p>
                <p className="text-[10px] text-muted-foreground">{theme === "dark" ? "Включена" : "Выключена"}</p>
              </div>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={onToggleTheme} />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <Icon name="Bell" size={15} />
              </div>
              <p className="text-sm font-medium">Уведомления</p>
            </div>
            <Switch checked={notif} onCheckedChange={setNotif} />
          </div>
        </div>

        {/* Menu */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden animate-fade-in stagger-4">
          {profileMenuItems.map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-muted transition-colors ${
                i < profileMenuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={15} fallback="CircleAlert" />
              </div>
              <span className="text-sm font-medium flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-bold bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full py-3.5 rounded-2xl border border-border text-sm font-medium text-muted-foreground flex items-center justify-center gap-2 animate-fade-in stagger-5">
          <Icon name="LogOut" size={15} />
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}