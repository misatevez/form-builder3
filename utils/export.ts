import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { FormTemplate, FormComponent } from '../types/form';

export function exportToPDF(template: FormTemplate, data: { [key: string]: any }) {
  console.log('exportToPDF - Template:', template);
  const doc = new jsPDF();

  doc.text(template.name, 10, 10);

  let yOffset = 20;
  template.components.forEach((component: FormComponent) => {
    doc.text(`${component.label}: ${data[component.id] || ''}`, 20, yOffset);
    yOffset += 10;
  });

  doc.save(`${template.name}.pdf`);
}

export function exportToExcel(template: FormTemplate, data: { [key: string]: any }) {
  console.log('exportToExcel - Template:', template);
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet([data]);
  XLSX.utils.book_append_sheet(wb, ws, 'Form Data');
  XLSX.writeFile(wb, `${template.name}.xlsx`);
}

export function exportToJSON(template: FormTemplate, data: { [key: string]: any }) {
  console.log('exportToJSON - Template:', template);
  const jsonString = JSON.stringify({ template, data }, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${template.name}.json`;
  link.click();
}

