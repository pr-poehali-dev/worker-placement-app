import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { reviews, availabilityDates } from "@/data/mockData";

interface Worker {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: string;
  location: string;
  available: boolean;
  initials: string;
  tags: string[];
  experience: string;
  completedOrders: number;
}

interface WorkerProfilePageProps {
  worker: Worker;
  onBack: () => void;
  onChat: () => void;
}

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function generateCalendar() {
  const today = new Date(2026, 2, 30);
  const days: { date: Date; key: string }[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push({ date: d, key });
  }
  return days;
}

export default function WorkerProfilePage({ worker, onBack, onChat }: WorkerProfilePageProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const workerReviews = reviews.filter((r) => r.workerId === worker.id);
  const calDays = generateCalendar();

  return (
    <div className="pb-24 bg-background min-h-screen">
      {/* Back header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4 bg-white border-b border-border sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"
        >
          <Icon name="ArrowLeft" size={16} />
        </button>
        <h1 className="font-semibold text-base">Профиль мастера</h1>
      </div>

      <div className="px-4 pt-5 space-y-5">
        {/* Profile card */}
        <div className="bg-white rounded-2xl p-5 border border-border animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center font-bold text-xl text-foreground">
                {worker.initials}
              </div>
              {worker.available && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg">{worker.name}</h2>
              <p className="text-sm text-muted-foreground">{worker.specialty}</p>
              <div className="flex items-center gap-1 mt-1">
                <Icon name="Star" size={14} className="fill-amber-400 stroke-amber-400" />
                <span className="text-sm font-semibold">{worker.rating}</span>
                <span className="text-sm text-muted-foreground">· {worker.reviews} отзывов</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-primary">{worker.price}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-lg font-bold">{worker.experience}</p>
              <p className="text-[10px] text-muted-foreground">Опыт</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{worker.completedOrders}</p>
              <p className="text-[10px] text-muted-foreground">Заказов</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{worker.rating}</p>
              <p className="text-[10px] text-muted-foreground">Рейтинг</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {worker.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs rounded-lg">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <Icon name="MapPin" size={12} />
            {worker.location}
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl p-4 border border-border animate-fade-in stagger-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Доступность</h3>
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500" /> Свободен
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-muted" /> Занят
              </span>
            </div>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {calDays.map(({ date, key }) => {
              const isAvail = availabilityDates[key] === true;
              const isSelected = selectedDate === key;
              const dayIdx = (date.getDay() + 6) % 7;
              return (
                <button
                  key={key}
                  onClick={() => isAvail && setSelectedDate(isSelected ? null : key)}
                  disabled={!isAvail}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 w-10 py-2 rounded-xl transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : isAvail
                      ? "bg-green-50 border border-green-200 hover:bg-green-100"
                      : "bg-muted opacity-50 cursor-not-allowed"
                  }`}
                >
                  <span className="text-[9px] font-medium">{DAYS[dayIdx]}</span>
                  <span className="text-sm font-bold">{date.getDate()}</span>
                </button>
              );
            })}
          </div>

          {selectedDate && (
            <div className="mt-3 p-3 bg-green-50 rounded-xl border border-green-200 animate-scale-in">
              <p className="text-xs font-medium text-green-800">
                ✓ Выбрана дата — мастер доступен
              </p>
            </div>
          )}
        </div>

        {/* Reviews */}
        <div className="animate-fade-in stagger-2">
          <h3 className="font-semibold text-sm mb-2">
            Отзывы ({workerReviews.length})
          </h3>
          <div className="space-y-2">
            {workerReviews.length === 0 ? (
              <div className="bg-white rounded-2xl p-4 border border-border text-center text-sm text-muted-foreground">
                Отзывов пока нет
              </div>
            ) : (
              workerReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl p-4 border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold">{rev.author}</p>
                      <p className="text-xs text-muted-foreground">{rev.order}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={
                            i < rev.rating
                              ? "fill-amber-400 stroke-amber-400"
                              : "fill-muted stroke-muted-foreground"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{rev.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-2">{rev.date}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-4 py-4 flex gap-3">
        <button
          onClick={onChat}
          className="flex-1 py-3 rounded-xl border border-border text-sm font-semibold flex items-center justify-center gap-2"
        >
          <Icon name="MessageCircle" size={16} />
          Написать
        </button>
        <button className="flex-[2] py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
          {selectedDate ? "Забронировать дату" : "Заказать услугу"}
        </button>
      </div>
    </div>
  );
}
