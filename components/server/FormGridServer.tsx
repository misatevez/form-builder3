import { supabase } from "@/lib/supabase"
import { FormGridClient } from "@/components/FormGridClient"
import { unstable_noStore as noStore } from 'next/cache'

async function getForms() {
  // Esto evita que Next.js almacene en caché la respuesta
  noStore()
  
  console.log("Obteniendo formularios desde la base de datos...")
  
  const { data, error } = await supabase
    .from("forms")
    .select("id, name, data, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error al obtener formularios:", error)
    throw error
  }
  
  console.log("Formularios obtenidos:", data?.length || 0)
  
  return data || []
}

export async function FormGridServer() {
  try {
    const forms = await getForms()
    return <FormGridClient forms={forms} />
  } catch (error) {
    console.error("Error en FormGridServer:", error)
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-md">
        <h3 className="text-red-800 font-medium">Error al cargar formularios</h3>
        <p className="text-red-600">No se pudieron cargar los formularios. Por favor, intenta recargar la página.</p>
      </div>
    )
  }
}
