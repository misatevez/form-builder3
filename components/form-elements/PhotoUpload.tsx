"use client"

import React, { useState } from 'react';
import { FormComponent } from '../../types/form';
import { Upload, X, ArrowUp, ArrowDown, CheckCircle, Trash2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from 'uuid';

interface PhotoUploadProps extends FormComponent {
  value: Array<{ url: string; category: string }>;
  onChange: (value: Array<{ url: string; category: string }>) => void;
  uploading: boolean;
}

export function PhotoUpload({ label, value, onChange, validation, uploading }: PhotoUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [categories, setCategories] = useState<string[]>(['General']);
  const [loadingUrls, setLoadingUrls] = useState<Record<string, boolean>>({});

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

  const handleFiles = async (files: File[]) => {
    const newPhotos = [];
    for (const file of files) {
      const id = uuidv4();
      setLoadingUrls(prev => ({ ...prev, [id]: true }));
      try {
        const fileName = `${uuidv4()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from("fsp-files")
          .upload(fileName, file);

        if (error) {
          console.error("Error uploading file:", error);
          throw error;
        }

        const publicUrl = supabase.storage
          .from("fsp-files")
          .getPublicUrl(fileName).data.publicUrl;

        newPhotos.push({ url: publicUrl, category: 'General' });
      } catch (error) {
        console.error("Error during file upload:", error);
      } finally {
        setLoadingUrls(prev => ({ ...prev, [id]: false }));
      }
    }
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
          className="mt-2 inline-block px-4 py-2 bg-primary  text-white rounded cursor-pointer hover:bg-primary/90"
        >
          Select Photos
        </label>
      </div>
      {value && value.length > 0 && (
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
                        <div className="relative">
                          <img src={photo.url || "/placeholder.svg"} alt={`Uploaded photo ${index + 1}`} className="w-16 h-16 object-cover rounded mr-4" />
                          {loadingUrls[index] && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
                              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                            </div>
                          )}
                          {!loadingUrls[index] && photo.url && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <CheckCircle className="h-8 w-8 text-green-500" />
                            </div>
                          )}
                        </div>
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
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removePhoto(index)}
                            className="text-destructive hover:text-destructive/90"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => movePhoto(index, Math.max(0, index - 1))}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => movePhoto(index, Math.min(value.length - 1, index + 1))}
                            disabled={index === value.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
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
      <Button
        type="button"
        onClick={addCategory}
        variant="outline"
        size="sm"
        className="mt-2"
      >
        Add Category
      </Button>
    </div>
  );
}
export default PhotoUpload;
