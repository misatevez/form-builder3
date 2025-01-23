import { supabase } from "@/lib/supabase"
import { FormGridClient } from "@/components/FormGridClient"

async function getForms() {
  const { data, error } = await supabase
    .from("forms")
    .select("id, name, data, created_at")
    .order("name", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function FormGridServer() {
  const forms = await getForms()
  return <FormGridClient forms={forms} />
}
