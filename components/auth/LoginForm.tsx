"use client"

    import { useState, useEffect } from "react"
    import { useRouter } from "next/navigation"
    import { createClient } from "@/lib/supabase-browser"
    import { Button } from "@/components/ui/button"
    import { Input } from "@/components/ui/input"
    import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
    import { useAuth } from "./AuthContext"

    export default function LoginForm() {
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [error, setError] = useState<string | null>(null)
      const router = useRouter()
      const supabase = createClient()
      const { user, loading } = useAuth()
      const [hasSession, setHasSession] = useState(false)

      useEffect(() => {
        if (!loading) {
          setHasSession(!!user)
        }
      }, [user, loading])

      const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          console.error("Login error:", error.message)
          setError(error.message)
        } else {
          console.log("Login successful, session:", data.session)
          router.push("/dashboard")
        }
      }

      if (loading) {
        return null; // Or a loading indicator
      }

      return (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{hasSession ? "You are logged in" : "Login"}</CardTitle>
          </CardHeader>
          <CardContent>
            {hasSession ? (
              <CardFooter className="flex justify-center mt-4">
                <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
              </CardFooter>
            ) : (
              <form onSubmit={handleLogin}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <CardFooter className="flex justify-between mt-4">
                  <Button type="submit">Login</Button>
                </CardFooter>
              </form>
            )}
          </CardContent>
        </Card>
      )
    }
