"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Column {
  label: string
  key?: string
  type?: 'text' | 'number'
  validation?: { required?: boolean }
  placeholder?: string
}

interface DynamicTableProps {
  id: string
  label: string
  value: any[][]
  onChange: (value: any[][]) => void
  columns: Column[]
  validation?: {
    required?: boolean
  }
  isPreview?: boolean
}

export default function DynamicTable({ id, label, value = [], onChange, columns, validation, isPreview }: DynamicTableProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleCellChange = (rowIndex: number, columnIndex: number, cellValue: string) => {
    const newValue = [...value]
    if (!newValue[rowIndex]) {
      newValue[rowIndex] = columns.map(() => "")
    }
    newValue[rowIndex][columnIndex] = cellValue
    onChange(newValue)
  }

  const handleDeleteRow = (rowIndex: number) => {
    const newValue = value.filter((_, index) => index !== rowIndex)
    onChange(newValue)
  }

  const addRow = () => {
    const newRow = columns.map(() => "")
    onChange([...value, newRow])
  }

  if (isMobile) {
    return (
      <div className="w-full space-y-2">
        <label
          htmlFor={id}
          className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", {
            "text-destructive": validation?.required,
          })}
        >
          {label} {validation?.required && <span className="text-destructive">*</span>}
        </label>
        <div className="space-y-4">
          {value.map((row, rowIndex) => (
            <div key={rowIndex} className="p-4 border rounded-md">
              <div className="space-y-3">
                {columns.map((column, columnIndex) => (
                  <div key={columnIndex} className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      {column.label}
                      {validation?.required && <span className="text-destructive ml-1">*</span>}
                    </label>
                    <input
                      type={column.type === 'number' ? 'number' : 'text'}
                      value={row[columnIndex] || ""}
                      onChange={(e) => handleCellChange(rowIndex, columnIndex, e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                ))}
                <div className="pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 w-full"
                    onClick={() => handleDeleteRow(rowIndex)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar fila
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {isPreview && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={addRow}
            >
              Añadir fila
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-2">
      <label
        htmlFor={id}
        className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", {
          "text-destructive": validation?.required,
        })}
      >
        {label} {validation?.required && <span className="text-destructive">*</span>}
      </label>
      <div className="rounded-md border">
        <ScrollArea className="w-full overflow-auto">
          <div className="min-w-[800px]">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableHead
                      key={index}
                      className="p-2 text-xs font-medium text-left whitespace-normal"
                      style={{ width: `${100 / columns.length}%` }}
                    >
                      {column.label}
                      {validation?.required && <span className="text-destructive ml-1">*</span>}
                    </TableHead>
                  ))}
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {value.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column, columnIndex) => (
                      <TableCell key={columnIndex} className="p-2">
                        <input
                          type={column.type === 'number' ? 'number' : 'text'}
                          value={row[columnIndex] || ""}
                          onChange={(e) => handleCellChange(rowIndex, columnIndex, e.target.value)}
                          className="w-full min-w-0 flex-1 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder={column.placeholder}
                        />
                      </TableCell>
                    ))}
                    <TableCell className="w-[50px] p-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive/90"
                        onClick={() => handleDeleteRow(rowIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      {actions.canAdd && !isPreview && (
        <Button
          onClick={addRow}
          type="button"
          className="mt-2"
        >
          <Plus size={16} className="inline-block mr-2" />
          Añadir fila
        </Button>
      )}
    </div>
  );
}
