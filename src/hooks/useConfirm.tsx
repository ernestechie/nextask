'use client';
import ResponsiveModal from '@/components/ResponsiveModal';
import { Button, type ButtonProps } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';

interface UseConfirmProps {
  title: string;
  message: string;
  variant?: ButtonProps['variant'];
}

type UseConfirmReturnType = [() => JSX.Element, () => Promise<unknown>];

const useConfirm = ({
  title,
  message,
  variant = 'primary',
}: UseConfirmProps): UseConfirmReturnType => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
      <Card className='w-full h-full border-none shadow-none'>
        <CardContent className='pt-8'>
          <CardHeader className='p-0'>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>

          {/*  */}
          <div className='pt-8 w-full gap-2 flex items-center justify-end'>
            <Button
              onClick={handleCancel}
              variant='outline'
              className='w-full lg:w-auto'
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              variant={variant}
              className='w-full lg:w-auto'
            >
              Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </ResponsiveModal>
  );

  return [ConfirmationDialog, confirm];
};

export default useConfirm;
