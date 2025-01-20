import React, { useState } from 'react';
import { FormComponent, TableColumn, TableValidation, TableActions } from '../../types/form';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { RenderComponent } from '../RenderComponent';

interface DynamicTableProps extends FormComponent {
  value: any[][];
  onChange: (value: any[][]) => void;
  columns: TableColumn[];
  validation: TableValidation;
  actions: TableActions;
}

export function DynamicTable({
  label,
  value,
  onChange,
  validation,
  columns,
  actions,
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
    newData[rowIndex][colIndex] = newValue;
    onChange(newData);
  };

  const moveRow = (fromIndex: number, toIndex: number) => {
    const newValue = [...value];
    const [movedRow] = newValue.splice(fromIndex, 1);
    newValue.splice(toIndex, 0, movedRow);
    onChange(newValue);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = value.slice(startIndex, endIndex);

  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">
        {label}
        {validation.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border border-gray-300 p-2 bg-gray-100">
                {column.label}
              </th>
            ))}
            {actions.canDelete && <th className="border border-gray-300 p-2 bg-gray-100">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {displayedRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border border-gray-300 p-2">
                  <RenderComponent
                    component={{
                      ...column,
                      id: `${label}-${rowIndex}-${colIndex}`,
                      value: row[colIndex],
                      onChange: (newValue) => updateCell(rowIndex + startIndex, colIndex, newValue),
                    }}
                    data={{}}
                    dispatch={() => {}}
                    sectionId=""
                  />
                </td>
              ))}
              {actions.canDelete && (
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => removeRow(rowIndex + startIndex)}
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                  {actions.canReorder && (
                    <>
                      <button
                        onClick={() => moveRow(rowIndex + startIndex, Math.max(0, rowIndex + startIndex - 1))}
                        className="p-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 ml-1"
                        disabled={rowIndex === 0}
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button
                        onClick={() => moveRow(rowIndex + startIndex, Math.min(value.length - 1, rowIndex + startIndex + 1))}
                        className="p-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 ml-1"
                        disabled={rowIndex === displayedRows.length - 1 && endIndex >= value.length}
                      >
                        <ArrowDown size={16} />
                      </button>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {actions.canAdd && (
        <button
          onClick={addRow}
          className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <Plus size={16} className="inline mr-1" /> Add Row
        </button>
      )}
      {value.length > rowsPerPage && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(value.length / rowsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(Math.ceil(value.length / rowsPerPage), currentPage + 1))}
            disabled={endIndex >= value.length}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

