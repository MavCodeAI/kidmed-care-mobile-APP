import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: string;
  email: string;
  name: string;
  specialization?: string;
  subscriptionTier: "free" | "pro" | "clinic";
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@kidmed_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call to backend
      const mockUser: User = {
        id: "user_" + Date.now(),
        email,
        name: email.split("@")[0],
        subscriptionTier: "free",
        createdAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem("@kidmed_user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      // TODO: Replace with actual API call to backend
      const mockUser: User = {
        id: "user_" + Date.now(),
        email,
        name,
        subscriptionTier: "free",
        createdAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem("@kidmed_user", JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error("Signup failed");
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@kidmed_user");
      setUser(null);
    } catch (error) {
      throw new Error("Logout failed");
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) throw new Error("No user logged in");

    try {
      const updatedUser = { ...user, ...updates };
      await AsyncStorage.setItem("@kidmed_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      throw new Error("Failed to update user");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isSignedIn: user !== null,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
