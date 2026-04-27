import { create } from "zustand";
import { THEMES } from "../constants";

const THEME_KEY = "preferred-theme";
const VALID_THEMES = new Set(THEMES.map((theme) => theme.name));
const FALLBACK_THEME = "forest";

const resolveTheme = (theme) => (VALID_THEMES.has(theme) ? theme : FALLBACK_THEME);

const applyThemeToDocument = (theme) => {
  const resolvedTheme = resolveTheme(theme);
  document.documentElement.setAttribute("data-theme", resolvedTheme);
  return resolvedTheme;
};

export const useThemeStore = create((set) => ({
  theme: resolveTheme(localStorage.getItem(THEME_KEY)),
  setTheme: (theme) => {
    const resolvedTheme = applyThemeToDocument(theme);
    localStorage.setItem(THEME_KEY, resolvedTheme);
    set({ theme: resolvedTheme });
  },
}));