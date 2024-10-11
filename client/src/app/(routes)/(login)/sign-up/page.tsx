'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUp } from '@/shared/api'
import { useMutation } from '@tanstack/react-query'

const signUpSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать не менее 2 символов'),
  email: z.string().email('Неверный формат email'),
  password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
})

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })
  const signUpMutation = useMutation({ mutationKey: ['sign-up'], mutationFn: signUp })

  const onSubmit = (data: SignUpFormData) => {
    signUpMutation.mutate(data)
    console.log('форма:', data)
  }

  return (
    <Card className='mx-auto max-w-sm border-none shadow-none'>
      <CardHeader>
        <CardTitle className='text-2xl'>Регистрация</CardTitle>
        <CardDescription>Введите свои данные для создания аккаунта</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
          <div className='w-full gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Имя и Фамилия</Label>
              <Input id='name' placeholder='Иван Иванов' {...register('name')} />
              {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
            </div>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='m@sberbank.ru' {...register('email')} />
            {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Пароль</Label>
            <Input id='password' type='password' {...register('password')} />
            {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
          </div>
          <Button type='submit' className='w-full'>
            Зарегистрироваться
          </Button>
          <Button type='button' variant='outline' className='w-full'>
            Войти с SberID
          </Button>
          <div className='mt-4 text-center text-sm'>
            Уже есть аккаунт?{' '}
            <Link href='/sign-in' className='underline'>
              Войти
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
