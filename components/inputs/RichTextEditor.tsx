import React from 'react';
import { FormComponent } from '../../types/form';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps extends FormComponent {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ label, value, onChange, validation }: RichTextEditorProps) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
      />
    </div>
  );
}

