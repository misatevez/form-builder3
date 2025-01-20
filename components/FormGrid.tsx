import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { FormEntriesModal } from "./FormEntriesModal"
import { CreateEntryModal } from "./CreateEntryModal"
import { FormGridClient } from "./FormGridClient"

async function getForms() {
  const { data, error } = await supabase
    .from("forms")
    .select("id, name, data, created_at")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function FormGrid() {
  const forms = await getForms()

  return <FormGridClient forms={forms} />
}

