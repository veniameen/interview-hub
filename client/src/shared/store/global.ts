import { create } from 'zustand'
import { Language } from '../model'

interface CommonStore {
  languages: Language
  setLanguages: (languages: Language) => void
}

export const useCommonStore = create<CommonStore>()((set) => ({
  languages: {},
  setLanguages: (languages) => set(() => ({ languages })),
}))
