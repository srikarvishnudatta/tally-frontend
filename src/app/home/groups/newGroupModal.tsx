'use client';
import Button from '@/components/button';
import Input from '@/components/input';
import { GroupModalProps } from '@/types/types'
import React, { FormEvent, useRef } from 'react'

function NewGroupModal({isOpen, onClose, onSubmit, group}: GroupModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const groupName = formData.get("expenseName") as string;
        const groupDesc = formData.get("description") as string;
        onSubmit({groupName, groupDescription: groupDesc});
        onClose();
    }
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
    if (!isOpen) return null;
  return (
    <div
          className="fixed inset-0 z-50 bg-white/80 flex items-center justify-center"
          onClick={handleOverlayClick}
        >
          <div
            className="bg-white rounded-2xl shadow-lg w-full max-w-md p-10 animate-fadeIn scale-100 transition-all duration-200"
            ref={modalRef}
          >
            <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="groupName"
                defaultValue={group?.groupName}
                placeholder="Name"
                required
                className="w-full border px-4 py-2 rounded-md"
              />
              
              <textarea
                name="groupDesc"
                placeholder="Description"
                defaultValue={group?.groupDescription}
                required
                
                className="w-full h- border border-gray-300 px-4 py-2 rounded-md"
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="destructive"
                  className="px-4 py-2 rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="px-4 py-2 rounded-md"
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
        </div>
  )
}

export default NewGroupModal