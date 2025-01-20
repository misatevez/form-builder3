"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EntryFormModal } from "./EntryFormModal"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function FormEntriesModal({ isOpen, onClose, form }) {
  const [entries, setEntries] = useState([])
  const [entryModalState, setEntryModalState] = useState({ isOpen: false, entry: null })
  const { toast } = useToast()
  const isAuthorized = true // Placeholder: reemplazar con la lógica real de autorización

  useEffect(() => {
    if (isOpen && form) {
      fetchEntries()
    }
  }, [isOpen, form])

  async function fetchEntries() {
    const { data, error } = await supabase
      .from("form_entries")
      .select("*")
      .eq("form_id", form.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching entries:", error)
    } else {
      setEntries(data)
    }
  }

  const handleEditEntry = (entry) => {
    setEntryModalState({ isOpen: true, entry })
  }

  const handleCreateEntry = () => {
    setEntryModalState({ isOpen: true, entry: null })
  }

  const handleDeleteForm = async () => {
    try {
      await supabase.from("forms").delete().eq("id", form.id)
      toast({
        title: "Form deleted",
        description: "The form has been successfully deleted.",
        duration: 3000,
      })
      onClose()
    } catch (error) {
      console.error("Error deleting form:", error)
      toast({
        title: "Error deleting form",
        description: "There was a problem deleting the form. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  const handleDeleteEntry = async (entryId) => {
    try {
      await supabase.from("form_entries").delete().eq("id", entryId)
      toast({
        title: "Entrada eliminada",
        description: "La entrada ha sido eliminada exitosamente.",
        duration: 3000,
      })
      fetchEntries() // Refrescar la lista de entradas
    } catch (error) {
      console.error("Error al eliminar la entrada:", error)
      toast({
        title: "Error al eliminar la entrada",
        description: "Hubo un problema al eliminar la entrada. Por favor, intente de nuevo.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Entradas para: {form?.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {entries.length === 0 ? (
            <p>No hay entradas para este formulario.</p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha de creación</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.id}</TableCell>
                      <TableCell>{entry.is_draft ? "Borrador" : "Publicado"}</TableCell>
                      <TableCell>{new Date(entry.created_at).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleEditEntry(entry)} className="mr-2">
                          Editar
                        </Button>
                        {isAuthorized && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive">Eliminar</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Se eliminará permanentemente esta entrada.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteEntry(entry.id)}>
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-center">
                <Button onClick={handleCreateEntry}>Crear nueva entrada</Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
      {entryModalState.isOpen && (
        <EntryFormModal
          isOpen={entryModalState.isOpen}
          onClose={() => {
            setEntryModalState({ isOpen: false, entry: null })
            fetchEntries() // Refetch entries after closing the modal
          }}
          form={form}
          existingEntry={entryModalState.entry}
        />
      )}
    </Dialog>
  )
}
