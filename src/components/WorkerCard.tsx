import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

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

interface WorkerCardProps {
  worker: Worker;
  onClick?: () => void;
}

export default function WorkerCard({ worker, onClick }: WorkerCardProps) {
  return (
    <div
      className="bg-white rounded-2xl p-4 border border-border card-hover cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center font-semibold text-foreground text-sm">
            {worker.initials}
          </div>
          {worker.available && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground text-sm leading-tight">{worker.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{worker.specialty}</p>
            </div>
            <span className="text-xs font-semibold text-primary whitespace-nowrap">{worker.price}</span>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Icon name="Star" size={12} className="fill-amber-400 stroke-amber-400" />
              <span className="text-xs font-semibold">{worker.rating}</span>
              <span className="text-xs text-muted-foreground">({worker.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Icon name="MapPin" size={12} />
              <span className="text-xs truncate">{worker.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {worker.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0 h-5 rounded-md font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
