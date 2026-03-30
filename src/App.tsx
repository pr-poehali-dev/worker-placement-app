import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import OrdersPage from "@/pages/OrdersPage";
import ChatPage from "@/pages/ChatPage";
import ProfilePage from "@/pages/ProfilePage";
import WorkerProfilePage from "@/pages/WorkerProfilePage";
import MapPage from "@/pages/MapPage";

type Page = "home" | "search" | "orders" | "chat" | "profile";

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

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [showMap, setShowMap] = useState(false);

  const handleNavigate = (target: string) => {
    if (target === "map") {
      setShowMap(true);
      return;
    }
    const pages: Page[] = ["home", "search", "orders", "chat", "profile"];
    if (pages.includes(target as Page)) {
      setPage(target as Page);
      setSelectedWorker(null);
      setShowMap(false);
    }
  };

  const handleWorkerSelect = (worker: Worker) => {
    setSelectedWorker(worker);
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="max-w-lg mx-auto relative bg-background min-h-screen font-golos">
        {showMap ? (
          <MapPage onBack={() => setShowMap(false)} />
        ) : selectedWorker ? (
          <WorkerProfilePage
            worker={selectedWorker}
            onBack={() => setSelectedWorker(null)}
            onChat={() => { setSelectedWorker(null); setPage("chat"); }}
          />
        ) : (
          <>
            {page === "home" && <HomePage onNavigate={handleNavigate} />}
            {page === "search" && <SearchPage onWorkerSelect={handleWorkerSelect} />}
            {page === "orders" && <OrdersPage />}
            {page === "chat" && <ChatPage />}
            {page === "profile" && <ProfilePage />}
            <BottomNav
              active={page}
              onChange={(p) => { setPage(p); setSelectedWorker(null); }}
            />
          </>
        )}
      </div>
    </TooltipProvider>
  );
}