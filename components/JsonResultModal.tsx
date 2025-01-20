import React from 'react';
import { useFormContext } from '../context/FormContext';

interface JsonResultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JsonResultModal: React.FC<JsonResultModalProps> = ({ isOpen, onClose }) => {
  const { template, data } = useFormContext();

  if (!isOpen) return null;

  const jsonResult = JSON.stringify({ template, data }, null, 2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-3/4 h-3/4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Resultado JSON del Formulario</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto flex-grow">
          {jsonResult}
        </pre>
        <button
          onClick={onClose}
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
