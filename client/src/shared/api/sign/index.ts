import { apiAxiosInstance } from '../base'

export const signUp = (data: { name: string; email: string; password: string }) => {
  return apiAxiosInstance.post<{ output: string; error: string }>('/api/register', data)
}

export const signIn = (data: { email: string; password: string }) => {
  return apiAxiosInstance.post<{ output: string; error: string }>('/token', data)
}
