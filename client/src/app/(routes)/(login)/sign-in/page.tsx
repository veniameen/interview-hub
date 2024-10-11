'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useAuth } from '@/shared/lib/hooks'


const signInSchema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
})

type SignInFormData = z.infer<typeof signInSchema>

export default function SignInForm() {
  const { loginMutation } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInFormData) => {
    loginMutation.mutate(data)
  }

  return (
    <Card className='w-full max-w-sm border-none shadow-none'>
      <CardHeader>
        <CardTitle className='text-2xl'>Вход</CardTitle>
        <CardDescription>Введите свои данные для входа в аккаунт.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className='grid gap-4'>
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
        </CardContent>
        <CardFooter className='flex flex-col gap-4'>
          <Button type='submit' className='w-full'>
            Войти
          </Button>
          <Button type='button' variant='outline' className='w-full'>
            Войти с SberID
          </Button>
        </CardFooter>
      </form>
      <div className='mb-4 text-center text-sm'>
        У вас нет аккаунта?{' '}
        <Link href='/sign-up' className='underline'>
          Зарегистрироваться
        </Link>
      </div>
    </Card>
  )
}
