import { Language } from '@/shared/model'
import { axiosInstance } from '../base'

export const getLanguages = () => {
  return axiosInstance.get<Language>('/languages')
}

export const runCode = (data: { code: string; language: string }) => {
  return axiosInstance.post<{ output: string; error: string }>('/run-code', data)
}
