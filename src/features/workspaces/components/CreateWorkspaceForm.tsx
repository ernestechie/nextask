'use client';

import { DottedSeparator } from '@/components/base/DottedSeparator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateWorkspace } from '../api/useCreateWorkspace';
import { createWorkspaceSchema } from '../schemas';

type CreateWorkspaceFormProps = {
  onCancel?: () => void;
};

type CreateWorkspaceFormValues = z.infer<typeof createWorkspaceSchema>;

export default function CreateWorkspaceForm({
  onCancel,
}: CreateWorkspaceFormProps) {
  const { mutate: handleCreateWorkspace, isPending } = useCreateWorkspace();

  const form = useForm<CreateWorkspaceFormValues>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: CreateWorkspaceFormValues) => {
    handleCreateWorkspace({ json: values });

    form.reset();
  };

  return (
    <Card className='w-full h-full shadow-none'>
      <CardHeader className='flex p-7'>
        <CardTitle>Create a new workspace</CardTitle>
      </CardHeader>
      <div className='px-7'>
        <DottedSeparator />
      </div>

      {/* Card Content */}
      <CardContent className='p-7'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>
                      Workspace Name *
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter workspace name' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DottedSeparator className='py-7' />
            <div className='flex items-center justify-between'>
              <Button
                type='button'
                size='large'
                variant='secondary'
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type='submit' size='large'>
                {isPending ? 'Loading...' : 'Create Workspace'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
