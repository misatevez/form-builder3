import React, { useRef, useState, useEffect } from 'react';
import { FormComponent } from '../../types/form';
import { Trash2, Save, Pencil } from 'lucide-react';

interface SignatureProps extends FormComponent {
  value: string;
  onChange: (value: string) => void;
}

export function Signature({ label, value, onChange, validation }: SignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureType, setSignatureType] = useState<'client' | 'technician'>('client');

  useEffect(() => {
    if (value && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.src = value;
      }
    }
  }, [value]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
      }
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      onChange(canvas.toDataURL());
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    onChange('');
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      onChange(canvas.toDataURL());
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mb-2">
        <select
          value={signatureType}
          onChange={(e) => setSignatureType(e.target.value as 'client' | 'technician')}
          className="w-full p-2 border rounded"
        >
          <option value="client">Client Signature</option>
          <option value="technician">Technician Signature</option>
        </select>
      </div>
      <canvas
        ref={canvasRef}
        width={300}
        height={150}
        className="border rounded cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
      />
      <div className="mt-2 flex space-x-2">
        <button
          type="button"
          onClick={clearSignature}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
        >
          <Trash2 size={16} className="mr-2" /> Clear
        </button>
        <button
          type="button"
          onClick={saveSignature}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
        >
          <Save size={16} className="mr-2" /> Save
        </button>
      </div>
      {value && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Signature Preview:</h4>
          <img src={value || "/placeholder.svg"} alt="Signature Preview" className="border rounded" />
        </div>
      )}
    </div>
  );
}

