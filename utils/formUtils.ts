import { supabase } from "./supabaseClient"

export async function saveFormToSupabase(template: any) {
  console.log("saveFormToSupabase function called")
  console.log("Template to be saved:", JSON.stringify(template, null, 2))
  try {
    if (!supabase) {
      throw new Error("Supabase client is not initialized")
    }

    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log("Supabase Anon Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Not set")

    const { data, error } = await supabase
      .from("forms")
      .upsert({ id: template.id, data: template }, { onConflict: "id" })

    if (error) {
      console.error("Supabase error:", error)
      throw error
    }

    console.log("Supabase response:", data)
    return data
  } catch (error) {
    console.error("Error in saveFormToSupabase:", error)
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    throw error
  }
}

