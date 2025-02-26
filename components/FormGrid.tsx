import { supabase } from "@/lib/supabase"
import { FormGridClient } from "./FormGridClient"

async function getForms() {
  const { data, error } = await supabase
    .from("forms")
    .select("id, name, data, created_at")
    .order("name", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function FormGrid() {
  const forms = await getForms()
  return <FormGridClient forms={forms} />
}
