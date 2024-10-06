'use client'

// Фронтенд (React + TypeScript)

// VideoChat.tsx
import React, { useEffect, useRef, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

interface Message {
    user: string;
    text: string;
}

const VideoChat: React.FC = () => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const screenShareRef = useRef<HTMLVideoElement>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const screenShareConnection = useRef<RTCPeerConnection | null>(null);
    const [isScreenSharing, setIsScreenSharing] = useState(false);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:5001/chatHub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected to SignalR Hub');

                    connection.on("ReceiveMessage", (user: string, message: string) => {
                        setMessages(prevMessages => [...prevMessages, { user, text: message }]);
                    });

                    connection.on("ReceiveOffer", async (offer: RTCSessionDescriptionInit, isScreenShare: boolean) => {
                        if (isScreenShare) {
                            await handleScreenShareOffer(offer);
                        } else {
                            await handleVideoOffer(offer);
                        }
                    });

                    connection.on("ReceiveAnswer", async (answer: RTCSessionDescriptionInit, isScreenShare: boolean) => {
                        const relevantConnection = isScreenShare ? screenShareConnection.current : peerConnection.current;
                        await relevantConnection!.setRemoteDescription(new RTCSessionDescription(answer));
                    });

                    connection.on("ReceiveCandidate", async (candidate: RTCIceCandidateInit, isScreenShare: boolean) => {
                        const relevantConnection = isScreenShare ? screenShareConnection.current : peerConnection.current;
                        await relevantConnection!.addIceCandidate(new RTCIceCandidate(candidate));
                    });
                })
                .catch(error => console.log('Connection failed: ', error));
        }
    }, [connection]);

    const setupPeerConnection = async (isScreenShare: boolean = false) => {
        const newConnection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        if (isScreenShare) {
            screenShareConnection.current = newConnection;
        } else {
            peerConnection.current = newConnection;
        }

        let stream;
        if (isScreenShare) {
            stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            setIsScreenSharing(true);
        } else {
            stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        }

        stream.getTracks().forEach(track => newConnection.addTrack(track, stream));

        if (isScreenShare && screenShareRef.current) {
            screenShareRef.current.srcObject = stream;
        } else if (!isScreenShare && localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
        }

        newConnection.ontrack = (event) => {
            if (isScreenShare && screenShareRef.current) {
                screenShareRef.current.srcObject = event.streams[0];
            } else if (!isScreenShare && remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        newConnection.onicecandidate = (event) => {
            if (event.candidate) {
                connection!.invoke("SendIceCandidate", JSON.stringify(event.candidate), isScreenShare);
            }
        };

        return newConnection;
    };

    const handleVideoOffer = async (offer: RTCSessionDescriptionInit) => {
        if (!peerConnection.current) {
            await setupPeerConnection();
        }
        await peerConnection.current!.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.current!.createAnswer();
        await peerConnection.current!.setLocalDescription(answer);
        await connection!.invoke("SendAnswer", JSON.stringify(answer), false);
    };

    const handleScreenShareOffer = async (offer: RTCSessionDescriptionInit) => {
        if (!screenShareConnection.current) {
            await setupPeerConnection(true);
        }
        await screenShareConnection.current!.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await screenShareConnection.current!.createAnswer();
        await screenShareConnection.current!.setLocalDescription(answer);
        await connection!.invoke("SendAnswer", JSON.stringify(answer), true);
    };

    const startCall = async () => {
        await setupPeerConnection();
        const offer = await peerConnection.current!.createOffer();
        await peerConnection.current!.setLocalDescription(offer);
        await connection!.invoke("SendOffer", JSON.stringify(offer), false);
    };

    const startScreenShare = async () => {
        if (isScreenSharing) {
            console.log('Already sharing screen');
            return;
        }

        await setupPeerConnection(true);
        const offer = await screenShareConnection.current!.createOffer();
        await screenShareConnection.current!.setLocalDescription(offer);
        await connection!.invoke("SendOffer", JSON.stringify(offer), true);
    };

    const stopScreenShare = () => {
        if (screenShareConnection.current) {
            screenShareConnection.current.close();
            screenShareConnection.current = null;
        }
        if (screenShareRef.current && screenShareRef.current.srcObject) {
            (screenShareRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        }
        setIsScreenSharing(false);
    };

    const sendMessage = async () => {
        if (connection && inputMessage) {
            await connection.invoke("SendMessage", "User", inputMessage);
            setInputMessage('');
        }
    };

    return (
        <div>
            <div>
                <video ref={localVideoRef} autoPlay muted />
                <video ref={remoteVideoRef} autoPlay />
                <video ref={screenShareRef} autoPlay />
            </div>
            <button onClick={startCall}>Start Call</button>
            <button onClick={startScreenShare} disabled={isScreenSharing}>Start Screen Share</button>
            <button onClick={stopScreenShare} disabled={!isScreenSharing}>Stop Screen Share</button>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
                ))}
            </div>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default VideoChat;
