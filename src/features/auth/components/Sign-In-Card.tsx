import { DottedSeparator } from '@/components/base/DottedSeparator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';
import { useAppLogin } from '../api/useAppLogin';
import { loginSchema } from '../schemas';

type SignInFormType = z.infer<typeof loginSchema>;
export function SignInCard() {
  const { mutate: handleSignIn, isPending } = useAppLogin();

  const form = useForm<SignInFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: SignInFormType) => {
    handleSignIn({ json: values });

    form.reset();
  };

  return (
    <Card className='w-full h-full md:w-[487px] border-none shadow-none'>
      <CardHeader className='flex items-center justify-center text-center p-7'>
        <CardTitle className='text-2xl'>Welcome Back!</CardTitle>
      </CardHeader>

      <div className='px-7'>
        {/* Separator */}
        <DottedSeparator direction='horizontal' />
      </div>

      <CardContent className='p-7'>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Enter email address'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='password'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter password'
                      {...field}
                      min={8}
                      max={256}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' size='large' disabled={isPending}>
              {isPending ? 'Loading...' : 'Sign In'}
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className='px-7'>
        <DottedSeparator />
      </div>
      <CardContent className='p-7 flex flex-col gap-y-4'>
        <Button className='w-full' size='large' variant='secondary'>
          <FcGoogle className='mr-2 size-5' /> Login with Google
        </Button>
        <Button className='w-full' size='large' variant='secondary'>
          <FaGithub className='mr-2 size-5' /> Login with GitHub
        </Button>
      </CardContent>

      <div>
        <div className='px-7'>
          <DottedSeparator />
        </div>
        <CardContent className='p-7 flex items-center justify-center text-sm'>
          <p className='font-medium'>
            Don`t have an account?{' '}
            <Link href='/sign-up'>
              <span className='text-blue-700'>Sign Up</span>
            </Link>
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
