"use client";
import React, { createContext, FC, useEffect } from "react";
import {
  createClientComponentClient,
  SupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface AuthProviderProps {
  accessToken: string | undefined;
  children: React.ReactNode;
}

export const AuthContext = createContext<any>(null); // Use a more specific type if possible

const AuthProvider: FC<AuthProviderProps> = ({ accessToken, children }) => {
  const supabase: SupabaseClient = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return <>{children}</>;
};

export default AuthProvider;
