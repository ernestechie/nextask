'use client';
import ResponsiveModal from '@/components/ResponsiveModal';
import React from 'react';
import useCreateWorkspaceModal from '../hooks/useCreateWorkspaceModal';
import CreateWorkspaceForm from './CreateWorkspaceForm';

export default function CreateWorkspaceModal() {
  const { isOpen, setIsOpen, closeModal } = useCreateWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={closeModal} />
    </ResponsiveModal>
  );
}
