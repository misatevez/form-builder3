import { FormTemplate } from '../types/form';

export function printForm(template: FormTemplate, data: { [key: string]: any }) {
  console.log('printForm - Template:', template);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>${template.name}</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #333; }
            .component { margin-bottom: 20px; }
            .field { margin-bottom: 10px; }
            @media print {
              body { -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <h1>${template.name}</h1>
          ${template.components.map(component => `
            <div class="component">
              <div class="field">
                <strong>${component.label}:</strong> ${data[component.id] || ''}
              </div>
            </div>
          `).join('')}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
}

