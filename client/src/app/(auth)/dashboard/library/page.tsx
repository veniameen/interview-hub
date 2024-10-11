'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MoreHorizontal, PlusCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useMediaQuery } from '@/shared/lib/hooks/use-media-query'
import { useCommonStore } from '@/shared/store/global'

const taskSchema = z.object({
  taskName: z.string().min(1, { message: 'Название задачи обязательно' }),
  description: z.string().min(1, { message: 'Описание обязательно' }),
  language: z.string().min(1, { message: 'Выберите язык' }),
  code: z.string().min(1, { message: 'Код задачи обязателен' }),
  answer: z.string().min(1, { message: 'Ответ обязателен' }),
  isPublic: z.boolean(),
  taskType: z.enum(['question', 'task'], {
    required_error: 'Выберите тип задачи',
  }),
})

const TaskForm = ({ onSubmit }: { onSubmit: (taskData: any) => void }) => {
  const { languages } = useCommonStore()
  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskName: '',
      description: '',
      language: '',
      code: '',
      answer: '',
      isPublic: false,
      taskType: 'task',
    },
  })

  const handleSubmit = (data: any) => {
    onSubmit(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='taskName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название задачи</FormLabel>
              <FormControl>
                <Input placeholder='Введите название задачи' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder='Введите описание (поддерживается Markdown)' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Язык</FormLabel>
              <Select
                items={Object.keys(languages).map((language) => ({ value: language, title: language }))}
                onChange={field.onChange}
                value={field.value}
                placeholder='Выберите язык'
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Код задачи</FormLabel>
              <FormControl>
                <Textarea placeholder='Введите код задачи' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='answer'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ответ</FormLabel>
              <FormControl>
                <Input placeholder='Введите ответ' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='isPublic'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Публичная задача</FormLabel>
                <FormDescription>Сделать задачу доступной для всех пользователей</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='taskType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип задачи</FormLabel>
              <Select
                items={[
                  {
                    title: 'Вопрос',
                    value: 'question',
                  },
                  {
                    title: 'Задача',
                    value: 'task',
                  },
                ]}
                onChange={field.onChange}
                value={field.value}
                placeholder='Выберите тип задачи'
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Добавить задачу</Button>
      </form>
    </Form>
  )
}

const AddTaskDialog = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: (taskData: any) => void
}) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='sm:max-w-[50%]'>
          <DialogHeader>
            <DialogTitle>Добавить задачу</DialogTitle>
            <DialogDescription>Заполните поля для создания новой задачи</DialogDescription>
          </DialogHeader>
          <TaskForm onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Добавить задачу</DrawerTitle>
          <DrawerDescription>Заполните поля для создания новой задачи</DrawerDescription>
        </DrawerHeader>
        <div className='p-4 pb-4'>
          <TaskForm onSubmit={onSubmit} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default function Library() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleAddTask = (taskData: any) => {
    console.log('новая задача:', taskData)
    setIsDrawerOpen(false)
  }

  return (
    <>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>Библиотека</h1>
      </div>
      <main className='grid flex-1 items-start gap-4 md:gap-8'>
        <Tabs defaultValue='all'>
          <div className='flex items-center'>
            <TabsList>
              <TabsTrigger value='all'>Все</TabsTrigger>
              <TabsTrigger value='active'>Личные</TabsTrigger>
              <TabsTrigger value='draft'>Публичные</TabsTrigger>
            </TabsList>
            <div className='ml-auto flex items-center gap-2'>
              <Button className='gap-1' onClick={() => setIsDrawerOpen(true)}>
                <PlusCircle className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Добавить задачу</span>
              </Button>
            </div>
          </div>
          <TabsContent value='all'>
            <Card x-chunk='dashboard-06-chunk-0'>
              <CardHeader>
                <CardTitle>Задачи</CardTitle>
                <CardDescription>Управление задачами. делись задачи с коллегами.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Языки</TableHead>
                      <TableHead className='hidden md:table-cell'>Использовали</TableHead>
                      <TableHead className='hidden md:table-cell'>Дата создания</TableHead>
                      <TableHead>
                        <span className='sr-only'>Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className='font-medium'>Написать алгоритм для поиска простых чисел</TableCell>
                      <TableCell>
                        <Badge variant='outline'>Публичная</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant='outline'>Python</Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>25</TableCell>
                      <TableCell className='hidden md:table-cell'>12.01.2024 10:42</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup='true' size='icon' variant='ghost'>
                              <MoreHorizontal className='h-4 w-4' />
                              <span className='sr-only'>Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Действия</DropdownMenuLabel>
                            <DropdownMenuItem>Редактировать</DropdownMenuItem>
                            <DropdownMenuItem>Удалить</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className='text-xs text-muted-foreground'>
                  Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        <AddTaskDialog isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onSubmit={handleAddTask} />
      </main>
    </>
  )
}
