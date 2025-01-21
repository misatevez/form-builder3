import { supabase } from "../lib/supabase"
import type { FormTemplate } from "../types/form"

export const api = {
  saveForm: async (template: FormTemplate): Promise<FormTemplate | null> => {
    console.log("Intentando guardar el formulario en Supabase:", template)
    try {
      const { data, error } = await supabase.from("forms").upsert({ id: template.id, data: template }).select().single()

      if (error) {
        console.error("Error de Supabase al guardar el formulario:", error)
        throw error
      }

      console.log("Formulario guardado exitosamente en Supabase:", data)
      return data as FormTemplate
    } catch (error) {
      console.error("Error al guardar el formulario en Supabase:", error)
      throw error
    }
  },
  // ... otras funciones de la API
}

