import { create } from 'zustand'
import {IMessageState} from "@/shared/store/types";

export const useMessageStore = create<IMessageState>((set) => ({
    chatMessages: [],
    setMessages: (mess) => set((state) => ({ chatMessages: [...state.chatMessages, mess] })),
}));
