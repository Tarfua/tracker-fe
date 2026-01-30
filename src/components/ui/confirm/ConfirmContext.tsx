"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { ConfirmDialog } from "./ConfirmDialog";

export interface ConfirmOptions {
  message: string;
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
}

interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

interface ConfirmState extends ConfirmOptions {
  isOpen: boolean;
}

const DEFAULT_CONFIRM_LABEL = "Підтвердити";
const DEFAULT_CANCEL_LABEL = "Скасувати";

const defaultOptions: ConfirmOptions = {
  message: "",
  title: "",
  confirmLabel: DEFAULT_CONFIRM_LABEL,
  cancelLabel: DEFAULT_CANCEL_LABEL,
  variant: "default",
};

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConfirmState>({
    ...defaultOptions,
    isOpen: false,
  });
  const resolveRef = useRef<(value: boolean) => void>(() => {});

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
      setState({
        ...defaultOptions,
        ...options,
        isOpen: true,
      });
    });
  }, []);

  const handleClose = useCallback((result: boolean) => {
    resolveRef.current(result);
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") handleClose(false);
    },
    [handleClose]
  );

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state.isOpen && (
        <ConfirmDialog
          title={state.title}
          message={state.message}
          confirmLabel={state.confirmLabel ?? DEFAULT_CONFIRM_LABEL}
          cancelLabel={state.cancelLabel ?? DEFAULT_CANCEL_LABEL}
          variant={state.variant ?? "default"}
          onConfirm={() => handleClose(true)}
          onCancel={() => handleClose(false)}
          onKeyDown={handleKeyDown}
        />
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmContextValue {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error("useConfirm must be used within ConfirmProvider");
  }
  return ctx;
}
