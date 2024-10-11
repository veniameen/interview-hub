'use client'

import React from 'react'
import Image from 'next/image'

import { cn } from '@/shared/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from './tooltip'

interface AvatarCirclesProps {
  className?: string
  numPeople?: number
  users: {
    url?: string
    name: string
  }[]
}

const AvatarCircles = ({ numPeople, className, users }: AvatarCirclesProps) => {
  return (
    <div className={cn('z-10 flex -space-x-4 rtl:space-x-reverse', className)}>
      <TooltipProvider>
        {users.map((user) => (
          <Tooltip key={user.name}>
            <TooltipTrigger asChild>
              {user.url ? (
                <Image
                  src={user.url}
                  alt={`Аватар ${user.name}`}
                  width={40}
                  height={40}
                  className='h-8 w-8 rounded-full border-2 border-white dark:border-gray-800'
                />
              ) : (
                <Avatar className="hidden h-8 w-8 sm:flex cursor-pointer">
                  <AvatarImage src="/avatars/02.png" />
                  <AvatarFallback className="rounded-full border-2 border-white dark:border-black text-[0.65rem]">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </TooltipTrigger>
            <TooltipContent side='bottom'>{user.name}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
      {numPeople && (
        <a
          className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black'
          href=''
        >
          +{numPeople}
        </a>
      )}
    </div>
  )
}

export default AvatarCircles
