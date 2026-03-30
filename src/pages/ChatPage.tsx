import { useState } from "react";
import Icon from "@/components/ui/icon";
import { messages, chatMessages } from "@/data/mockData";

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [inputText, setInputText] = useState("");

  if (activeChat !== null) {
    const chat = messages.find((m) => m.id === activeChat);
    return (
      <div className="flex flex-col h-screen bg-background">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 pt-12 pb-4 bg-card border-b border-border">
          <button
            onClick={() => setActiveChat(null)}
            className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"
          >
            <Icon name="ArrowLeft" size={16} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center font-semibold text-xs">
              АМ
            </div>
            <div>
              <p className="text-sm font-semibold">{chat?.worker}</p>
              <p className="text-[10px] text-green-600">Онлайн</p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
            <Icon name="Phone" size={16} />
          </button>
        </div>

        {/* Order context */}
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950 border-b border-blue-100 dark:border-blue-800">
          <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-400">
            <Icon name="ClipboardList" size={12} />
            <span>Заказ {chat?.orderId} · Замена смесителя на кухне</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-2">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.sender === "client"
                    ? "bg-foreground text-background rounded-br-sm"
                    : "bg-card border border-border text-foreground rounded-bl-sm"
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    msg.sender === "client" ? "text-background/50" : "text-muted-foreground"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 py-4 bg-card border-t border-border pb-6">
          <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-2.5">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Сообщение..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              onKeyDown={(e) => e.key === "Enter" && setInputText("")}
            />
            <button
              onClick={() => setInputText("")}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                inputText
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              <Icon name="Send" size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 bg-background min-h-screen">
      <div className="px-4 pt-10 pb-4 bg-card border-b border-border">
        <h1 className="text-xl font-bold animate-fade-in">Сообщения</h1>
      </div>

      <div className="px-4 pt-4 space-y-2">
        {messages.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="MessageCircle" size={40} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Сообщений пока нет</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <button
              key={msg.id}
              onClick={() => setActiveChat(msg.id)}
              className="w-full bg-card rounded-2xl p-4 border border-border card-hover text-left animate-fade-in"
              style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  {msg.worker.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <p className="font-semibold text-sm">{msg.worker}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                      {msg.unread > 0 && (
                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-[9px] font-bold text-primary-foreground">
                            {msg.unread}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {msg.lastMessage}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Заказ {msg.orderId}
                  </p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}