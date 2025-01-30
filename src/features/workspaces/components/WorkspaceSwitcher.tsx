'use client';
import { useGetWorkspaces } from '@/features/workspaces/api/useGetWorkspaces';
import { SelectValue } from '@radix-ui/react-select';
import React from 'react';
import { RiAddCircleFill } from 'react-icons/ri';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../../../components/ui/select';
import WorkspaceAvatar from './WorkspaceAvatar';

export default function WorkspaceSwitcher() {
  const { data } = useGetWorkspaces();

  return (
    <div className='flex flex-col gap-y-2'>
      <div className='flex items-center justify-between text-neutral-600 mb-2'>
        <p className='text-sm uppercase font-semibold'>Workspaces</p>
        <RiAddCircleFill className='size-5 cursor-pointer hover:opacity-75 transition' />
      </div>

      <Select>
        <SelectTrigger className='w-full bg-neutral-100 font-medium px-3'>
          <SelectValue placeholder='No workspace selected' />
        </SelectTrigger>

        <SelectContent>
          {data?.workspaces?.documents.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              <div className='flex justify-start items-center gap-3 font-semibold'>
                <WorkspaceAvatar
                  name={workspace.name}
                  image={workspace.imageUrl}
                />
                <span className='truncate'>{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
