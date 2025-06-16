import { createContext, useContext } from "react";

type HomeContextType = {
  refreshNotes: () => void;
};

export const HomeContext = createContext<HomeContextType | null>(null);

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a NotesProvider");
  }
  return context;
}
