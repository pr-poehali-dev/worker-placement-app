import Icon from "@/components/ui/icon";

type Page = "home" | "search" | "orders" | "chat" | "profile";

interface BottomNavProps {
  active: Page;
  onChange: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "search", label: "Поиск", icon: "Search" },
  { id: "orders", label: "Заказы", icon: "ClipboardList" },
  { id: "chat", label: "Чат", icon: "MessageCircle" },
  { id: "profile", label: "Профиль", icon: "User" },
];

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="max-w-lg mx-auto flex">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 nav-item transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon
                name={item.icon}
                size={20}
                className={isActive ? "stroke-[2.5]" : "stroke-[1.5]"}
              />
              <span className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 w-6 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}