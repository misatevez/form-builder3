import React, { useState } from 'react';
import { FormComponent, TableColumn, TableValidation, TableActions } from '../../types/form';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface DynamicTableProps extends FormComponent {
  value?: any[][];
  onChange: (value: any[][]) => void;
  columns?: TableColumn[];
  validation?: TableValidation;
  actions?: TableActions;
  isPreview?: boolean;
}

export function DynamicTable({
  id,
  label,
  value = [],
  onChange,
  validation = {},
  columns = [],
  actions = { canAdd: true, canDelete: true, canReorder: true },
  isPreview = false,
}: DynamicTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const addRow = () => {
    const newRow = columns.map(() => '');
    onChange([...value, newRow]);
  };

  const removeRow = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  const updateCell = (rowIndex: number, colIndex: number, newValue: any) => {
    const newData = [...value];
    if (!newData[rowIndex]) {
      newData[rowIndex] = columns.map(() => '');
    }
    newData[rowIndex][colIndex] = newValue;
    onChange(newData);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = value.slice(startIndex, endIndex);

  return (
    <div className="mb-6">
      {label && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{label}</h3>
          {validation?.description && (
            <p className="text-sm text-gray-600 mt-1">{validation.description}</p>
          )}
        </div>
      )}
      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 text-left text-sm font-medium text-gray-900 border-b ${
                    index === columns.length - 1 ? 'border-r-0' : 'border-r'
                  }`}
                >
                  {column.label}
                  {column.validation?.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </th>
              ))}
              {actions.canDelete && (
                <th className="w-20 px-4 py-3 text-left text-sm font-medium text-gray-900 border-b">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {displayedRows.length > 0 ? (
              displayedRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b last:border-b-0">
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-3 text-sm text-gray-900 border-r last:border-r-0"
                    >
                      <input
                        type={column.type === 'number' ? 'number' : 'text'}
                        value={row[colIndex] || ''}
                        onChange={(e) => updateCell(rowIndex + startIndex, colIndex, e.target.value)}
                        className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={column.validation?.required}
                        placeholder={column.placeholder}
                      />
                    </td>
                  ))}
                  {actions.canDelete && (
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => removeRow(rowIndex + startIndex)}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions.canDelete ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No hay datos disponibles. Añade una fila para comenzar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(actions.canAdd || isPreview) && (
        <button
          onClick={addRow}
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Plus size={16} className="inline-block mr-2" />
          Añadir entrada
        </button>
      )}

      {value.length > rowsPerPage && (
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-white border rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-600">
            Página {currentPage} de {Math.ceil(value.length / rowsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(Math.ceil(value.length / rowsPerPage), currentPage + 1))}
            disabled={endIndex >= value.length}
            className="px-3 py-1 text-sm bg-white border rounded-md disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default DynamicTable;

