import { create } from "zustand";

interface ApiKeyState {
  apiKey: string;
  setApiKey: (key: string) => void;
}

// Zustand store with TypeScript
const useApiKeyStore = create<ApiKeyState>((set) => ({
  apiKey: localStorage.getItem("apiKey") || "",
  setApiKey: (newKey: string) => {
    localStorage.setItem("apiKey", newKey);
    set({ apiKey: newKey });
  },
}));

export default useApiKeyStore;
