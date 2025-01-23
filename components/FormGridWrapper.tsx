import { Suspense } from "react"
import { FormGrid } from "./FormGrid"

export function FormGridWrapper() {
  return (
    <Suspense fallback={<div>Cargando formularios...</div>}>
      <FormGrid />
    </Suspense>
  )
}

