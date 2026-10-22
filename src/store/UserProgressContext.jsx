import { createContext, useContext, useMemo, useState } from "react";

export const PROGRESS = {
  NONE: "none",
  CART: "cart",
  CHECKOUT: "checkout",
};

const UserProgressContext = createContext(null);

export function UserProgressContextProvider({ children }) {
  const [progress, setProgress] = useState(PROGRESS.NONE);

  const value = useMemo(
    () => ({
      progress,
      showCart: () => setProgress(PROGRESS.CART),
      showCheckout: () => setProgress(PROGRESS.CHECKOUT),
      close: () => setProgress(PROGRESS.NONE),
    }),
    [progress],
  );

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
}

export function useUserProgress() {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error(
      "useUserProgress must be used inside <UserProgressContextProvider>",
    );
  }
  return context;
}
