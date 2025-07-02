'use client';
import React, { createContext, useState, useCallback, ReactNode } from 'react';

type ToastContextType = {
  toast: (message: string, type?: string) => void;
};

export const ToastContext = createContext<ToastContextType>({
  toast: () => {},
});

let idCounter = 0;

type Toast = { id: number; message: string; type: string };

export const ToastProvider = ({ children }: {children: ReactNode}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type = 'default') => {
    const id = idCounter++;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded shadow text-white animate-slide-in ${
              t.type === 'success' ? 'bg-green-600' :
              t.type === 'error' ? 'bg-red-600' :
              'bg-gray-800'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
