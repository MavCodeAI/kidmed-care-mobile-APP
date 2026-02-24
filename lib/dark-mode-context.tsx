import { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ColorScheme = "light" | "dark";

interface DarkModeContextType {
  isDarkMode: boolean;
  colorScheme: ColorScheme;
  toggleDarkMode: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    systemColorScheme || "light"
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved preference on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const saved = await AsyncStorage.getItem("theme-preference");
        if (saved === "dark" || saved === "light") {
          setColorScheme(saved);
        }
      } catch (error) {
        console.error("Failed to load theme preference:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadThemePreference();
  }, []);

  const toggleDarkMode = async () => {
    const newScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newScheme);
    try {
      await AsyncStorage.setItem("theme-preference", newScheme);
    } catch (error) {
      console.error("Failed to save theme preference:", error);
    }
  };

  const handleSetColorScheme = async (scheme: ColorScheme) => {
    setColorScheme(scheme);
    try {
      await AsyncStorage.setItem("theme-preference", scheme);
    } catch (error) {
      console.error("Failed to save theme preference:", error);
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode: colorScheme === "dark",
        colorScheme,
        toggleDarkMode,
        setColorScheme: handleSetColorScheme,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}
