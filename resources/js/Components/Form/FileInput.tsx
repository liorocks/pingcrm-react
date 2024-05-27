import React, { useState, useRef, ComponentProps } from 'react';
import { fileSize } from '@/utils';
import { Omit } from 'lodash';

interface FileInputProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  error?: string;
  onChange?: (file: File | null) => void;
}

export default function FileInput({ name, error, onChange }: FileInputProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  function handleBrowse() {
    fileInput?.current?.click();
  }

  function handleRemove() {
    setFile(null);
    onChange?.(null);

    // fileInput?.current?.value = '';
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const files = e.currentTarget?.files as FileList;
    const file = files[0] || null;

    setFile(file);
    onChange?.(file);
  }

  return (
    <div
      className={`form-input w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300 rounded p-0 ${
        error && 'border-red-400 focus:border-red-400 focus:ring-red-400'
      }`}
    >
      <input
        id={name}
        ref={fileInput}
        type="file"
        className="hidden"
        onChange={handleChange}
      />
      {!file && (
        <div className="p-2">
          <BrowseButton text="Browse" onClick={handleBrowse} />
        </div>
      )}
      {file && (
        <div className="flex items-center justify-between p-2">
          <div className="flex-1 pr-1">
            {file?.name}
            <span className="ml-1 text-xs text-gray-600">
              ({fileSize(file?.size)})
            </span>
          </div>
          <BrowseButton text="Remove" onClick={handleRemove} />
        </div>
      )}
    </div>
  );
}

interface BrowseButtonProps extends ComponentProps<'button'> {
  text: string;
}

function BrowseButton({ text, onClick, ...props }: BrowseButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className="px-4 py-1 text-xs font-medium text-white bg-gray-600 rounded-sm focus:outline-none hover:bg-gray-700"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
