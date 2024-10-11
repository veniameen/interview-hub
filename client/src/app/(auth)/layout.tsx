'use client'

import type { PropsWithChildren } from 'react'
import { getLanguages } from '@/shared/api'
import { useCommonStore } from '@/shared/store/global'
import { useQuery } from '@tanstack/react-query'

export default function AuthLayout({ children }: PropsWithChildren) {
  const { setLanguages } = useCommonStore()

  useQuery({
    queryFn: async () => {
      const { data } = await getLanguages()
      setLanguages(data)
      return data
    },
    queryKey: ['languages'],
  })
  return <>{children}</>
}
