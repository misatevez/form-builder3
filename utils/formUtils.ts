import { supabase } from "../lib/supabase"
import type { FormTemplate } from "../types/form"

export async function saveFormToSupabase(form: FormTemplate) {
  const { data, error } = await supabase
    .from("forms")
    .upsert(
      {
        id: form.id,
        name: form.name,
        data: form,
      },
      { onConflict: "id" },
    )
    .select()

  if (error) {
    throw error
  }

  return data
}
