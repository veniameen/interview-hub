'use client'

import Link from 'next/link'
import { CircleUser, Home, Menu, Users, Library, ScanFace } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/shared/lib/utils'
import { usePathname } from 'next/navigation'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useEffect, useState } from 'react'
import { ModeToggle } from '@/components/mode-toggle'
import { ProfileSettingsModal } from '@/components/profile-settings-modal'

export const description = 'Интервьюер'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Главная' },
    { href: '/dashboard/users', icon: Users, label: 'Кандидаты' },
    { href: '/dashboard/library', icon: Library, label: 'Библиотека' },
  ]

  const candidates = [
    { id: 1, name: 'Иван Иванов', position: 'Frontend Developer' },
    { id: 2, name: 'Мария Петрова', position: 'UX Designer' },
    { id: 3, name: 'Алексей Сидоров', position: 'Backend Developer' },
  ]

  return (
    <div className='grid min-h-screen w-full'>
      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-8 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <Link href='/'>
            <div className='flex items-center gap-2'>
              <Button variant='outline' size='icon' aria-label='Home'>
                <ScanFace className='size-5 fill-foreground' />
              </Button>
              <span className='text-lg font-medium leading-none'>InterviewHub</span>
            </div>
          </Link>
          <div className='flex items-center gap-2 justify-between flex-1'>
            <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 flex-1'>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    isActive(item.href) && 'bg-muted text-primary',
                  )}
                >
                  <item.icon className='h-4 w-4' />
                  {item.label}
                </Link>
              ))}
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='left'>
                <nav className='grid gap-6 text-lg font-medium'>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        isActive(item.href) && 'bg-muted text-primary',
                      )}
                    >
                      <item.icon className='h-4 w-4' />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <div className='flex items-center justify-between gap-4'>
              <div className='flex items-center justify-between'>
                <Button
                  variant='outline'
                  className='relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
                  onClick={() => setOpen(true)}
                >
                  <span className='hidden lg:inline-flex'>Поиск по кандидатам...</span>
                  <span className='inline-flex lg:hidden'>Поиск...</span>
                  <kbd className='pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
                    <span className='text-xs'>⌘</span>K
                  </kbd>
                </Button>
                <CommandDialog open={open} onOpenChange={setOpen}>
                  <CommandInput placeholder='Поиск по кандидатам...' />
                  <CommandList>
                    <CommandEmpty>Кандидаты не найдены.</CommandEmpty>
                    <CommandGroup heading='Кандидаты'>
                      {candidates.map((candidate) => (
                        <CommandItem key={candidate.id}>
                          <Users className='mr-2 h-4 w-4' />
                          <span>{candidate.name}</span>
                          <span className='ml-auto text-xs text-muted-foreground'>{candidate.position}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </CommandDialog>
              </div>
              <ModeToggle />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex items-center gap-4'>
                <div className='grid gap-1'>
                  <p className='text-sm font-medium leading-none'>Вениамин Ряднов</p>
                </div>
                <Button variant='secondary' size='icon' className='rounded-full'>
                  <CircleUser className='h-5 w-5' />
                  <span className='sr-only'>Меню</span>
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setIsProfileModalOpen(true)}>Настройки</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href='/logout'>Выйти</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>{children}</main>
      </div>
      <ProfileSettingsModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        defaultValues={{
          name: 'Вениамин Ряднов',
          email: 'veniamin@sberbank.ru',
        }}
      />
    </div>
  )
}
