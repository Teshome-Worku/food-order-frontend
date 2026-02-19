/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ToastContext = createContext(null);

const TOAST_DURATION = 3000;

const buildToastId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef(new Map());

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));

    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message, type = "success") => {
      const id = buildToastId();
      setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

      const timer = setTimeout(() => {
        removeToast(id);
      }, TOAST_DURATION);

      timersRef.current.set(id, timer);
    },
    [removeToast]
  );

  useEffect(
    () => () => {
      for (const timer of timersRef.current.values()) {
        clearTimeout(timer);
      }
      timersRef.current.clear();
    },
    []
  );

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
    success: "border-green-700 bg-green-600 text-white",
    error: "border-red-700 bg-red-600 text-white",
    info: "border-blue-700 bg-blue-600 text-white",
  };

  return (
    <div
      className={`animate-toast-in flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg ${styles[type] || styles.success}`}
      role="alert"
    >
      {type === "success" ? <span aria-hidden="true">OK</span> : null}
      {type === "error" ? <span aria-hidden="true">X</span> : null}
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
