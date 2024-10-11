import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {useMessageStore} from "@/shared/store";

interface InterviewChatI {
    connection: signalR.HubConnection | null;
}

const InterviewChat: React.FC<InterviewChatI> = ({ connection }) => {
    const [message, setMessage] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messages = useMessageStore((state) => state.chatMessages);
    const setMessages = useMessageStore((state) => state.setMessages);

    useEffect(() => {
        if (connection) {
            connection.on('ReceiveMessage', (room: string, user: string, message: string) => {
                setMessages({ user, text: message });
            });
        }
    }, [connection]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (connection && message && user) {
            try {
                console.log('SendMessage: ', user, message)
                await connection.invoke('SendMessage', '1', user, message);
                setMessage('');
            } catch (e) {
                console.log('Send message error: ', e);
            }
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <h2 className="text-2xl font-bold">Чат</h2>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] w-full pr-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            <span className="font-bold">{msg.user}: </span>
                            <span>{msg.text}</span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Input
                    type="text"
                    placeholder="Your name"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <div className="flex space-x-2 w-full">
                    <Input
                        type="text"
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage}>Send</Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default InterviewChat;
