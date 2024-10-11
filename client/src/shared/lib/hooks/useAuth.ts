import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const result = await signIn('credentials', {
        ...credentials,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      return result
    },
    onSuccess: () => {
      router.push('/')
    },
    onError: (error) => {
      console.error('Login error:', error)
    },
  })

  return { loginMutation }
}