import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("forms")
      .select("id, name, data, created_at")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching forms:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

