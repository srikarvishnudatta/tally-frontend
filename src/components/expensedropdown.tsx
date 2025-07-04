// components/DropdownMenu.js
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Trash, Edit } from 'lucide-react';

type DropdownMenuProps = {
  onEdit: () => void,
  onDelete: () => void
}

const DropdownMenu = ({ onEdit, onDelete }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-right" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded hover:bg-gray-100"
      >
        ...
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-300 rounded shadow-md z-10">
          <button
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
            className="flex items-center gap-1 w-full px-4 py-2 text-sm hover:bg-gray-100"
          >
            <Edit size={16}/>Edit
          </button>
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="flex items-center gap-1 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <Trash size={16}/> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
