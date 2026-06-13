"use client";

import * as React from "react";
import { cn } from "./lib/cn";

// Toast — lightweight action feedback (no external dep). Wrap the app once in
// <ToastProvider>; call `useToast().toast({...})` after a mutation. Toasts stack
// bottom-right and auto-dismiss. Presentational; tone = success | error | info.
type ToastTone = "success" | "error" | "info";
interface ToastInput { title: string; description?: string; tone?: ToastTone }
interface ToastItem extends Required<Pick<ToastInput, "title" | "tone">> { id: number; description?: string }

const ToastCtx = React.createContext<{ toast: (t: ToastInput) => void }>({ toast: () => {} });
export function useToast() { return React.useContext(ToastCtx); }

const TONE_DOT: Record<ToastTone, string> = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

export function ToastProvider({ children, duration = 4000 }: { children: React.ReactNode; duration?: number }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const idRef = React.useRef(0);
  const toast = React.useCallback((t: ToastInput) => {
    const id = (idRef.current += 1);
    setItems((xs) => [...xs, { id, tone: "info", description: undefined, ...t }]);
    setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), duration);
  }, [duration]);

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col items-end gap-2">
        {items.map((t) => (
          <div key={t.id} data-slot="toast" className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-lg border bg-card px-4 py-3 shadow-md">
            <span className={cn("mt-1 size-2 shrink-0 rounded-full", TONE_DOT[t.tone])} />
            <div>
              <p className="text-sm font-medium">{t.title}</p>
              {t.description && <p className="text-xs text-muted-foreground">{t.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
