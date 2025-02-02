'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { DottedSeparator } from '@/components/base/DottedSeparator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import useConfirm from '@/hooks/useConfirm';
import { cn } from '@/lib/utils';

import { useCreateWorkspace } from '../api/useCreateWorkspace';
import { useDeleteWorkspace } from '../api/useDeleteWorkspace';
import { useUpdateWorkspace } from '../api/useUpdateWorkspace';
import { createWorkspaceSchema, updateWorkspaceSchema } from '../schemas';
import { NextaskWorkspace } from '../types';

type CreateWorkspaceFormProps = {
  onCancel?: () => void;
  mode?: 'CREATE' | 'UPDATE';
  initialValues?: NextaskWorkspace;
};

type CreateWorkspaceFormValues = z.infer<typeof createWorkspaceSchema>;
type UpdateWorkspaceFormValues = z.infer<typeof updateWorkspaceSchema>;

export default function CreateWorkspaceForm({
  onCancel,
  mode = 'CREATE',
  initialValues,
}: CreateWorkspaceFormProps) {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [DeleteModal, confirmDelete] = useConfirm({
    title: 'Delete Workspace',
    message: 'This action is irreversible and will remove all associated data',
    variant: 'destructive',
  });

  const { mutate: createWorkspace, isPending: isCreating } =
    useCreateWorkspace();
  const { mutate: updateWorkspace, isPending: isUpdating } =
    useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeleting } =
    useDeleteWorkspace();

  const form = useForm<CreateWorkspaceFormValues | UpdateWorkspaceFormValues>({
    resolver: zodResolver(
      mode === 'CREATE' ? createWorkspaceSchema : updateWorkspaceSchema
    ),
    defaultValues: {
      name: initialValues?.name,
      image: initialValues?.imageUrl ?? '',
    },
  });

  const onSubmit = (
    values: CreateWorkspaceFormValues | UpdateWorkspaceFormValues
  ) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : '',
    };

    if (mode === 'UPDATE' && initialValues?.$id)
      updateWorkspace(
        {
          form: finalValues,
          param: {
            workspaceId: initialValues?.$id,
          },
        },
        {
          onSuccess() {
            form.reset();
          },
        }
      );
    else if (mode === 'CREATE' && finalValues.name)
      createWorkspace(
        { form: finalValues as CreateWorkspaceFormValues },
        {
          onSuccess({ data }) {
            form.reset();
            router.push(`/workspaces/${data.workspace?.$id}`);
          },
        }
      );
  };

  const handleDeleteWorkspace = async () => {
    const okay = await confirmDelete();

    if (!okay || !initialValues || initialValues.$id === '') return;

    deleteWorkspace(
      { param: { workspaceId: initialValues.$id } },
      {
        onSuccess() {
          router.push(`/`);
        },
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) form.setValue('image', file);
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <Card className='w-full h-full shadow-none'>
        <CardHeader className='p-7 flex flex-row items-center gap-x-4 space-y-0'>
          {mode === 'UPDATE' && (
            <Button
              size='small'
              variant='secondary'
              onClick={() => (onCancel ? onCancel() : router.back())}
            >
              Back
              <ArrowLeftIcon className='size-4 mr-4' />
            </Button>
          )}
          <CardTitle>
            {mode === 'CREATE' ? 'Create a new ' : 'Edit '} workspace
          </CardTitle>
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

                {/* Image upload */}
                <FormField
                  control={form.control}
                  name='image'
                  render={({ field }) => {
                    const src =
                      field.value instanceof File
                        ? URL.createObjectURL(field.value)
                        : `${field.value}`;

                    return (
                      <>
                        <div className='flex flex-col gap-y-2 mt-4'>
                          <div className='flex items-center gap-x-5'>
                            {field.value ? (
                              <div className='size-20 relative rounded-md overflow-hidden'>
                                <Image
                                  src={src}
                                  alt='Logo'
                                  className='object-cover'
                                  width={100}
                                  height={100}
                                />
                              </div>
                            ) : (
                              <Avatar>
                                <AvatarFallback>
                                  <ImageIcon className='text-neutral-500' />
                                </AvatarFallback>
                              </Avatar>
                            )}

                            <div className='flex flex-col'>
                              <p className='text-sm'>Workspace Icon</p>
                              <p className='text-sm text-muted-foreground'>
                                JPG, PNG SVG, JPG. Max 1mb
                              </p>
                            </div>
                          </div>
                          {/* Upload Image Button */}

                          <input
                            title='Workspace Image'
                            id='image'
                            name='image'
                            type='file'
                            className='hidden'
                            ref={ref}
                            accept='.jpg, .png, .jpeg, .svg'
                            onChange={handleImageChange}
                            disabled={isCreating || isUpdating}
                          />
                          {field.value ? (
                            <Button
                              type='button'
                              variant='destructive'
                              disabled={isCreating || isUpdating}
                              size='extra_small'
                              className='w-fit mt-2'
                              onClick={() => {
                                field.onChange(null);
                                if (ref.current) {
                                  ref.current.value = '';
                                }
                              }}
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type='button'
                              variant='tertiary'
                              disabled={isCreating || isUpdating}
                              size='extra_small'
                              className='w-fit mt-2'
                              onClick={() => ref.current?.click()}
                            >
                              {field.value ? 'Change' : 'Upload'} Image
                            </Button>
                          )}
                        </div>
                        <FormMessage />
                      </>
                    );
                  }}
                />
              </div>
              <DottedSeparator className='py-7' />
              <div className='flex items-center justify-between'>
                <Button
                  type='button'
                  size='large'
                  variant='secondary'
                  onClick={onCancel}
                  disabled={isCreating || isUpdating}
                  className={cn(onCancel ? 'visible' : 'invisible')}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  size='large'
                  disabled={isCreating || isUpdating}
                >
                  {mode === 'CREATE' ? (
                    <span>
                      {isUpdating ? 'Loading...' : 'Create Workspace'}
                    </span>
                  ) : (
                    <span>{isUpdating ? 'Loading...' : 'Save Changes'}</span>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {mode === 'UPDATE' && (
        <>
          <DeleteModal />
          <Card className='w-full h-full border-none shadow-none'>
            <CardContent className='p-7'>
              <div className='flex flex-col'>
                <h3 className='font-bold'>Danger Zone</h3>
                <p className='text-sm text-muted-foreground'>
                  Deleting a workspace is irreversible and will remove all
                  associated data
                </p>

                <Button
                  className='mt-6 w-fit ml-auto'
                  size='small'
                  variant='destructive'
                  type='button'
                  disabled={isDeleting}
                  onClick={handleDeleteWorkspace}
                >
                  Delete Workspace
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
