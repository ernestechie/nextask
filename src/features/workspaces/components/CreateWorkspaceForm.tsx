'use client';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';
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
  const ref = useRef<HTMLInputElement>(null);
  const { mutate: handleCreateWorkspace, isPending } = useCreateWorkspace();

  const form = useForm<CreateWorkspaceFormValues>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: CreateWorkspaceFormValues) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : '',
    };

    handleCreateWorkspace(
      { form: finalValues },
      {
        onSuccess: () => {
          form.reset();
          // TODO: Redirect to the new workspace page
        },
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
    }
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
                          disabled={isPending}
                        />
                        <Button
                          type='button'
                          variant='tertiary'
                          disabled={isPending}
                          size='extra_small'
                          className='w-fit mt-2'
                          onClick={() => ref.current?.click()}
                        >
                          Upload Image
                        </Button>
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
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type='submit' size='large' disabled={isPending}>
                {isPending ? 'Loading...' : 'Create Workspace'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
