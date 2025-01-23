"use client"

    import { createContext, useContext, useEffect, useState } from "react"
    import type { User, Session } from "@supabase/supabase-js"
    import { createClient } from "@/lib/supabase-browser"

    type AuthContextType = {
      user: User | null
      session: Session | null
      loading: boolean
    }

    const AuthContext = createContext<AuthContextType | undefined>(undefined)

    export function AuthProvider({ children, initialSession }: { children: React.ReactNode, initialSession?: string | null }) {
      const [user, setUser] = useState<User | null>(null)
      const [session, setSession] = useState<Session | null>(null)
      const [loading, setLoading] = useState(true)
      const supabase = createClient()

      useEffect(() => {
        const setData = async () => {
          console.log("AuthProvider - initialSession:", initialSession);
          if (initialSession) {
            try {
              const parsedSession = JSON.parse(initialSession);
              setUser(parsedSession.user ?? null);
              setSession(parsedSession);
              setLoading(false);
              console.log("AuthProvider - Using initialSession");
            } catch (e) {
              console.error("AuthProvider - Error parsing initialSession:", e);
              setLoading(false);
            }
            return;
          }
          const {
            data: { session },
            error,
          } = await supabase.auth.getSession()
          if (error) console.log("AuthProvider - Error fetching session:", error)
          else {
            setSession(session)
            setUser(session?.user ?? null)
            console.log("AuthProvider - Fetched session:", session);
          }
          setLoading(false)
        }

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
          setUser(session?.user ?? null)
          setLoading(false)
          console.log("AuthProvider - Auth state changed:", session);
        })

        setData()

        return () => {
          subscription.unsubscribe()
        }
      }, [initialSession, supabase])

      return <AuthContext.Provider value={{ user, session, loading }}>{children}</AuthContext.Provider>
    }

    export const useAuth = () => {
      const context = useContext(AuthContext)
      if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
      }
      return context
    }
