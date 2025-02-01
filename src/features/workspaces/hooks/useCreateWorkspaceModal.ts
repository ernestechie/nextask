import { parseAsBoolean, useQueryState } from 'nuqs';

export default function useCreateWorkspaceModal() {
  const [isOpen, setIsOpen] = useQueryState(
    'create-workspace',
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, setIsOpen, openModal, closeModal };
}
