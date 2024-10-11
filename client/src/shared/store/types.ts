export interface IMessage {
    user: string;
    text: string;
}

export interface IMessageState {
    chatMessages: IMessage[];
    setMessages: (mess: IMessage) => void;
}
