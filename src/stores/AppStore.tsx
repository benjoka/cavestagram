import { create } from "zustand";

export interface AppStore {
  activeView: string;
  participateMode: string | null;
  selfie: string;
  setActiveView: (view: string) => void;
  setParticipateMode: (mode: string | null) => void;
  setSelfie: (selfie: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  activeView: "grotte-passe",
  participateMode: null,
  selfie: "",
  setActiveView: (view: string) => set(() => ({ activeView: view })),
  setParticipateMode: (mode: string | null) =>
    set(() => ({ participateMode: mode })),
  setSelfie: (selfie: string) => set(() => ({ selfie: selfie })),
}));
