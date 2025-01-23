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
import autoTable from "jspdf-autotable"
import { useAuth } from "./auth/AuthContext"

export function FormEntriesModal({ isOpen, onClose, form, currentUser }) {
  const { user } = useAuth()
  const [entries, setEntries] = useState([])
  const [userEmails, setUserEmails] = useState({})
  const [entryModalState, setEntryModalState] = useState({ isOpen: false, entry: null, fileName: "" })
  const [createModalState, setCreateModalState] = useState({ isOpen: false, fileName: "" })
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false)
  const [newFileName, setNewFileName] = useState("")
  const { toast } = useToast()
  const { primaryColor } = useTheme()
  const isAuthorized = user?.email === "misatevez@gmail.com"

  useEffect(() => {
    if (isOpen && form) {
      fetchEntries()
    }
  }, [isOpen, form])

  async function fetchEntries() {
    let query = supabase
      .from("form_entries")
      .select("*")
      .eq("form_id", form.id)
      .order("created_at", { ascending: false })

    if (user?.email !== "misatevez@gmail.com") {
      query = query.eq("user_id", user?.id)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching entries:", error)
    } else {
      setEntries(data)
      if (isAuthorized) {
        fetchUserEmails(data.map((entry) => entry.user_id))
      }
    }
  }

  async function fetchUserEmails(userIds) {
    const { data, error } = await supabase.from("users").select("id, email").in("id", userIds)

    if (error) {
      console.error("Error fetching user emails:", error)
    } else {
      const emailMap = {}
      data.forEach((user) => {
        emailMap[user.id] = user.email
      })
      setUserEmails(emailMap)
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

  const handleDeleteEntry = async (entryId) => {
    try {
      await supabase.from("form_entries").delete().eq("id", entryId)
      toast({
        title: "Entrada eliminada",
        description: "La entrada ha sido eliminada exitosamente.",
        duration: 3000,
      })
      fetchEntries()
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
    try {
      const doc = new jsPDF()

      doc.setFontSize(18)
      doc.setTextColor(40)
      doc.text(`Entrada: ${entry.file_name}`, 10, 10)

      doc.setFontSize(14)
      doc.setTextColor(60)
      doc.text(`Formulario: ${form.name}`, 10, 20)

      let yPos = 30

      if (entry.data && form.data?.sections) {
        form.data.sections.forEach((section) => {
          doc.setFontSize(12)
          doc.setFont("helvetica", "bold")
          doc.text(section.title, 10, yPos)
          yPos += 10

          if (section.components.length > 0) {
            const columns = section.components.map((component) => component.label)
            const row = section.components.map((component) => entry.data[component.id] || "N/A")

            autoTable(doc, {
              startY: yPos,
              head: [columns],
              body: [row],
              styles: { fontSize: 10 },
              headStyles: { fillColor: [40, 167, 69] },
            })

            yPos = doc.lastAutoTable.finalY + 10
          } else {
            doc.setFontSize(10)
            doc.setTextColor(100)
            doc.text("No hay datos en esta sección.", 10, yPos)
            yPos += 10
          }
        })
      } else {
        doc.setFontSize(12)
        doc.text("No hay datos disponibles para esta entrada.", 10, yPos)
      }

      doc.save(`${entry.file_name || "documento"}.pdf`)

      toast({
        title: "PDF exportado",
        description: "El PDF ha sido generado y la descarga ha comenzado.",
        duration: 3000,
      })
    } catch (error) {
      console.error("Error generando el PDF:", error)
      toast({
        title: "Error al exportar PDF",
        description: "Hubo un problema al generar el PDF. Por favor, intente de nuevo.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

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
                      {isAuthorized && <TableHead>User Email</TableHead>}
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.file_name}</TableCell>
                        <TableCell>{entry.is_draft ? "Borrador" : "Publicado"}</TableCell>
                        <TableCell>{new Date(entry.created_at).toLocaleString()}</TableCell>
                        {isAuthorized && <TableCell>{userEmails[entry.user_id] || "Loading..."}</TableCell>}
                        <TableCell>
                          <Button onClick={() => handleEditEntry(entry)} variant="ghost" size="icon" className="mr-2">
                            <Edit className="h-4 w-4" />
                          </Button>
                         
                          {(isAuthorized || entry.user_id === user?.id) && (
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
            fetchEntries()
          }}
          form={form}
          entry={entryModalState.entry}
          fileName={entryModalState.fileName}
          currentUser={currentUser}
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
          currentUser={currentUser}
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

