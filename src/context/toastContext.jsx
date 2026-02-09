import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

const TOAST_DURATION = 3000;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts }) => (
  <div
    className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2"
    role="region"
    aria-label="Notifications"
  >
    {toasts.map((toast) => (
      <Toast key={toast.id} message={toast.message} type={toast.type} />
    ))}
  </div>
);

const Toast = ({ message, type }) => {
  const styles = {
    success: "bg-green-600 text-white border-green-700",
    error: "bg-red-600 text-white border-red-700",
    info: "bg-blue-600 text-white border-blue-700",
  };

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg animate-toast-in ${styles[type] || styles.success}`}
      role="alert"
    >
      {type === "success" && (
        <span className="text-lg" aria-hidden="true">
          ✓
        </span>
      )}
      {type === "error" && (
        <span className="text-lg" aria-hidden="true">
          ✕
        </span>
      )}
      <span>{message}</span>
    </div>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
};
