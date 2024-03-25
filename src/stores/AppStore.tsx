import { create } from "zustand";

export interface AppStore {
  activeView: string;
  participateMode: string | null;
  selfie: string | null;
  setActiveView: (view: string) => void;
  setParticipateMode: (mode: string | null) => void;
  setSelfie: (selfie: string | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  activeView: "grotte-passe",
  participateMode: null,
  selfie: null,
  setActiveView: (view: string) => set(() => ({ activeView: view })),
  setParticipateMode: (mode: string | null) =>
    set(() => ({ participateMode: mode })),
  setSelfie: (selfie: string | null) => set(() => ({ selfie: selfie })),
}));
