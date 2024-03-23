import { create } from "zustand";

export interface AppStore {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  activeView: "grotte-passe",
  setActiveView: (view: string) => set(() => ({ activeView: view })),
}));
