import React, { useState } from 'react';
import { FormComponent } from '../../types/form';
import { Upload, X, ArrowUp, ArrowDown } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface PhotoUploadProps extends FormComponent {
  value: Array<{ url: string; category: string }>;
  onChange: (value: Array<{ url: string; category: string }>) => void;
}

export function PhotoUpload({ label, value, onChange, validation }: PhotoUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [categories, setCategories] = useState<string[]>(['General']);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newPhotos = files.map((file) => ({
      url: URL.createObjectURL(file),
      category: 'General',
    }));
    onChange([...value, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...value];
    newPhotos.splice(index, 1);
    onChange(newPhotos);
  };

  const movePhoto = (fromIndex: number, toIndex: number) => {
    const newPhotos = [...value];
    const [movedItem] = newPhotos.splice(fromIndex, 1);
    newPhotos.splice(toIndex, 0, movedItem);
    onChange(newPhotos);
  };

  const updatePhotoCategory = (index: number, newCategory: string) => {
    const newPhotos = [...value];
    newPhotos[index].category = newCategory;
    onChange(newPhotos);
  };

  const addCategory = () => {
    const newCategory = prompt('Enter a new category name:');
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newPhotos = Array.from(value);
    const [reorderedItem] = newPhotos.splice(result.source.index, 1);
    newPhotos.splice(result.destination.index, 0, reorderedItem);

    onChange(newPhotos);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold">
        {label}
        {validation?.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2">Drag and drop photos here, or click to select files</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id="photo-upload"
        />
        <label
          htmlFor="photo-upload"
          className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
        >
          Select Photos
        </label>
      </div>
      {value.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="photo-list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="mt-4">
                {value.map((photo, index) => (
                  <Draggable key={index} draggableId={`photo-${index}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center mb-2 p-2 bg-gray-100 rounded"
                      >
                        <img src={photo.url || "/placeholder.svg"} alt={`Uploaded photo ${index + 1}`} className="w-16 h-16 object-cover rounded mr-4" />
                        <div className="flex-grow">
                          <select
                            value={photo.category}
                            onChange={(e) => updatePhotoCategory(index, e.target.value)}
                            className="w-full p-2 border rounded"
                          >
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => movePhoto(index, Math.max(0, index - 1))}
                            className="p-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            disabled={index === 0}
                          >
                            <ArrowUp size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => movePhoto(index, Math.min(value.length - 1, index + 1))}
                            className="p-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            disabled={index === value.length - 1}
                          >
                            <ArrowDown size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <button
        type="button"
        onClick={addCategory}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Category
      </button>
    </div>
  );
}

