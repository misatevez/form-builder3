// components/FormEntriesModal.tsx
"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EditEntryModal } from "./EditEntryModal"
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
import { useTheme } from "@/utils/theme"
import { EntryFormModal } from "./EntryFormModal"
import { Edit, Trash2, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import jsPDF from "jspdf"
import { saveAs } from "file-saver"

export function FormEntriesModal({ isOpen, onClose, form }) {
  const [entries, setEntries] = useState([])
  const [entryModalState, setEntryModalState] = useState({ isOpen: false, entry: null, fileName: "" })
  const [createModalState, setCreateModalState] = useState({ isOpen: false, fileName: "" })
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false)
  const [newFileName, setNewFileName] = useState("")
  const { toast } = useToast()
  const isAuthorized = true // Placeholder: reemplazar con la lógica real de autorización
  const { primaryColor } = useTheme()

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
    setEntryModalState({ isOpen: true, entry, fileName: entry.file_name })
  }

  const handleCreateEntry = () => {
    setIsCreateAlertOpen(true)
  }

  const handleConfirmCreate = () => {
    if (newFileName) {
      setCreateModalState({ isOpen: true, fileName: newFileName })
      setIsCreateAlertOpen(false)
      setNewFileName("")
    }
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

const handleExportToPDF = (entry) => {
  // Confirmación personalizada
  const userPermission = window.confirm(
    "¿Quieres permitir la descarga de archivos?"
  );

  if (!userPermission) {
    toast({
      title: "Descarga cancelada",
      description: "No se generó el archivo PDF.",
      duration: 3000,
    });
    return; // Salir si el usuario no otorga permiso
  }

  try {
    const doc = new jsPDF();

    // Agregar contenido al PDF
    doc.setFontSize(18);
    doc.text(`Entrada: ${entry.file_name}`, 10, 10);
    doc.setFontSize(14);
    doc.text(`Formulario: ${form.name}`, 10, 20);
    doc.setFontSize(12);
    let yPos = 30;
    doc.text("This is a basic PDF template without a logo.", 10, yPos);

    // Generar PDF y descargarlo
    const pdfBlob = doc.output("blob");
    saveAs(pdfBlob, `${entry.file_name || "documento"}.pdf`);

    toast({
      title: "PDF exportado",
      description: "El archivo PDF se descargó correctamente.",
      duration: 3000,
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast({
      title: "Error al exportar PDF",
      description: "Hubo un problema al generar el PDF. Por favor, intente de nuevo.",
      variant: "destructive",
      duration: 5000,
    });
  }
};


  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Entradas para: {form?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {entries.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No hay entradas para este formulario.</p>
                <Button
                  onClick={handleCreateEntry}
                  className="mt-4"
                  style={{ backgroundColor: primaryColor, color: "#ffffff" }}
                >
                  Crear nueva entrada
                </Button>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre de archivo</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha de creación</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.file_name}</TableCell>
                        <TableCell>{entry.is_draft ? "Borrador" : "Publicado"}</TableCell>
                        <TableCell>{new Date(entry.created_at).toLocaleString()}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleEditEntry(entry)} variant="ghost" size="icon" className="mr-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button onClick={() => handleExportToPDF(entry)} variant="ghost" size="icon" className="mr-2">
                            <FileText className="h-4 w-4" />
                          </Button>
                          {isAuthorized && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
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
                  <Button onClick={handleCreateEntry} style={{ backgroundColor: primaryColor, color: "#ffffff" }}>
                    Crear nueva entrada
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {entryModalState.isOpen && (
        <EditEntryModal
          isOpen={entryModalState.isOpen}
          onClose={() => {
            setEntryModalState({ isOpen: false, entry: null })
            fetchEntries() // Refetch entries after closing the modal
          }}
          form={form}
          entry={entryModalState.entry}
          fileName={entryModalState.fileName}
        />
      )}

      {createModalState.isOpen && (
        <EntryFormModal
          isOpen={createModalState.isOpen}
          onClose={() => {
            setCreateModalState({ isOpen: false, fileName: "" })
            fetchEntries()
          }}
          form={form}
          fileName={createModalState.fileName}
        />
      )}

      <AlertDialog open={isCreateAlertOpen} onOpenChange={setIsCreateAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Crear nueva entrada</AlertDialogTitle>
            <AlertDialogDescription>
              Por favor, ingresa el nombre del archivo para la nueva entrada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-4">
            <Input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Nombre del archivo"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsCreateAlertOpen(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCreate}>Crear</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
