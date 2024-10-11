'use client'

import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

interface Peer {
    id: string;
    connection: RTCPeerConnection;
    stream: MediaStream | null;
    screenStream: MediaStream | null;
    isMicrophoneEnabled: boolean;
    isCameraEnabled: boolean;
    isScreenSharing: boolean;
}

const WebRTCCommunication = () => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [peers, setPeers] = useState<{ [key: string]: Peer }>({});
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [localScreenStream, setLocalScreenStream] = useState<MediaStream | null>(null);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(true);
    const [isCameraEnabled, setIsCameraEnabled] = useState(true);
    const [roomId, setRoomId] = useState('');

    useEffect(() => {
        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/api/chatHub`)
            .withAutomaticReconnect()
            .build();

        hubConnection.start()
            .then(() => {
                console.log('SignalR Connected');
                setConnection(hubConnection);
                setupSignalRListeners(hubConnection);
            })
            .catch(err => console.error('SignalR Connection Error: ', err));

        return () => {
            hubConnection.stop();
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            if (localScreenStream) {
                localScreenStream.getTracks().forEach(track => track.stop());
            }
            Object.values(peers).forEach(peer => peer.connection.close());
        };
    }, []);

    const setupSignalRListeners = (hubConnection: signalR.HubConnection) => {
        hubConnection.on('UserJoined', (userId: string) => {
            console.log(`User ${userId} joined the room`);
            createPeerConnection(userId);
        });

        hubConnection.on('UserLeft', (userId: string) => {
            console.log(`User ${userId} left the room`);
            removePeerConnection(userId);
        });

        hubConnection.on('ReceiveOffer', async (userId: string, offer: string) => {
            console.log(`Received offer from ${userId}`);
            const peerConnection = getPeerConnection(userId);
            await peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(offer)));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            hubConnection.invoke('SendAnswer', roomId, userId, JSON.stringify(answer));
        });

        hubConnection.on('ReceiveAnswer', async (userId: string, answer: string) => {
            console.log(`Received answer from ${userId}`);
            const peerConnection = getPeerConnection(userId);
            await peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer)));
        });

        hubConnection.on('ReceiveCandidate', async (userId: string, candidate: string) => {
            console.log(`Received ICE candidate from ${userId}`);
            const peerConnection = getPeerConnection(userId);
            await peerConnection.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate)));
        });

        hubConnection.on('ReceiveMicrophoneState', (userId: string, isEnabled: boolean) => {
            setPeers(prevPeers => ({
                ...prevPeers,
                [userId]: { ...prevPeers[userId], isMicrophoneEnabled: isEnabled }
            }));
        });

        hubConnection.on('ReceiveCameraState', (userId: string, isEnabled: boolean) => {
            setPeers(prevPeers => ({
                ...prevPeers,
                [userId]: { ...prevPeers[userId], isCameraEnabled: isEnabled }
            }));
        });

        hubConnection.on('ReceiveScreenShareState', (userId: string, isSharing: boolean) => {
            setPeers(prevPeers => ({
                ...prevPeers,
                [userId]: { ...prevPeers[userId], isScreenSharing: isSharing }
            }));
        });
    };

    const createPeerConnection = (userId: string) => {
        const peerConnection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });

        peerConnection.onicecandidate = (event) => {
            if (event.candidate && connection) {
                console.log('Sending ICE Candidate:', event.candidate);
                connection.invoke('SendIceCandidate', roomId, userId, JSON.stringify(event.candidate));
            }
        };

        peerConnection.ontrack = (event) => {
            console.log(`Received remote track from ${userId}:`, event.streams[0]);
            setPeers(prevPeers => ({
                ...prevPeers,
                [userId]: {
                    ...prevPeers[userId],
                    stream: event.transceiver.mid === "0" ? event.streams[0] : prevPeers[userId].stream,
                    screenStream: event.transceiver.mid === "2" ? event.streams[0] : prevPeers[userId].screenStream
                }
            }));
        };

        if (localStream) {
            localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
        }

        if (localScreenStream) {
            localScreenStream.getTracks().forEach(track => peerConnection.addTrack(track, localScreenStream));
        }

        setPeers(prevPeers => ({
            ...prevPeers,
            [userId]: {
                id: userId,
                connection: peerConnection,
                stream: null,
                screenStream: null,
                isMicrophoneEnabled: true,
                isCameraEnabled: true,
                isScreenSharing: false
            }
        }));

        return peerConnection;
    };

    const removePeerConnection = (userId: string) => {
        setPeers(prevPeers => {
            const newPeers = { ...prevPeers };
            if (newPeers[userId]) {
                newPeers[userId].connection.close();
                delete newPeers[userId];
            }
            return newPeers;
        });
    };

    const getPeerConnection = (userId: string): RTCPeerConnection => {
        if (!peers[userId]) {
            return createPeerConnection(userId);
        }
        return peers[userId].connection;
    };

    const startCall = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            setLocalStream(stream);
            setIsMicrophoneEnabled(true);
            setIsCameraEnabled(true);

            Object.values(peers).forEach(peer => {
                stream.getTracks().forEach(track => peer.connection.addTrack(track, stream));
            });

            if (connection) {
                await connection.invoke('JoinRoom', roomId);
                for (const userId of Object.keys(peers)) {
                    const offer = await peers[userId].connection.createOffer();
                    await peers[userId].connection.setLocalDescription(offer);
                    connection.invoke('SendOffer', roomId, userId, JSON.stringify(offer));
                }
            }
        } catch (error) {
            console.error('Error during video call: ', error);
        }
    };

    const startScreenShare = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true,
            });

            setLocalScreenStream(stream);
            setIsScreenSharing(true);

            Object.values(peers).forEach(peer => {
                stream.getTracks().forEach(track => peer.connection.addTrack(track, stream));
            });

            if (connection) {
                connection.invoke('SendScreenShareState', roomId, true);
            }

            stream.getVideoTracks()[0].onended = () => {
                stopScreenShare();
            };
        } catch (error) {
            console.error('Error during screen sharing: ', error);
        }
    };

    const stopScreenShare = () => {
        if (localScreenStream) {
            localScreenStream.getTracks().forEach(track => track.stop());
            setLocalScreenStream(null);
            setIsScreenSharing(false);

            Object.values(peers).forEach(peer => {
                peer.connection.getSenders().forEach(sender => {
                    if (sender.track && sender.track.kind === 'video' && sender.track.label.includes('screen')) {
                        peer.connection.removeTrack(sender);
                    }
                });
            });

            if (connection) {
                connection.invoke('SendScreenShareState', roomId, false);
            }
        }
    };

    const toggleMicrophone = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMicrophoneEnabled(audioTrack.enabled);

                if (connection) {
                    connection.invoke('SendMicrophoneState', roomId, audioTrack.enabled);
                }
            }
        }
    };

    const toggleCamera = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsCameraEnabled(videoTrack.enabled);

                if (connection) {
                    connection.invoke('SendCameraState', roomId, videoTrack.enabled);
                }
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter Room ID"
            />
            <br/>
            <button onClick={startCall}>Join Room and Start Call</button>
            <br/>
            <button onClick={toggleMicrophone} disabled={!localStream}>
                {isMicrophoneEnabled ? 'Mute Microphone' : 'Unmute Microphone'}
            </button>
            <br/>
            <button onClick={toggleCamera} disabled={!localStream}>
                {isCameraEnabled ? 'Turn Off Camera' : 'Turn On Camera'}
            </button>
            <br/>
            <button onClick={isScreenSharing ? stopScreenShare : startScreenShare} disabled={!localStream}>
                {isScreenSharing ? 'Stop Screen Share' : 'Start Screen Share'}
            </button>
            <br/>
            <div>
                <h3>Local Video</h3>
                <video
                    ref={video => {
                        if (video && localStream) video.srcObject = localStream;
                    }}
                    autoPlay
                    playsInline
                    muted
                    controls
                    style={{width: '300px', height: '225px'}}
                />
            </div>
            {isScreenSharing && (
                <div>
                    <h3>Local Screen Share</h3>
                    <video
                        ref={video => {
                            if (video && localScreenStream) video.srcObject = localScreenStream;
                        }}
                        autoPlay
                        playsInline
                        muted
                        controls
                        style={{width: '300px', height: '225px'}}
                    />
                </div>
            )}
            {Object.values(peers).map(peer => (
                <div key={peer.id}>
                    <h3>Remote Video ({peer.id})</h3>
                    <video
                        ref={video => {
                            if (video && peer.stream) video.srcObject = peer.stream;
                        }}
                        autoPlay
                        playsInline
                        controls
                        style={{width: '300px', height: '225px'}}
                    />
                    {peer.screenStream && (
                        <div>
                            <h4>Remote Screen Share ({peer.id})</h4>
                            <video
                                ref={video => {
                                    if (video && peer.screenStream) video.srcObject = peer.screenStream;
                                }}
                                autoPlay
                                playsInline
                                controls
                                style={{width: '300px', height: '225px'}}
                            />
                        </div>
                    )}
                    <div>Microphone: {peer.isMicrophoneEnabled ? 'On' : 'Off'}</div>
                    <div>Camera: {peer.isCameraEnabled ? 'On' : 'Off'}</div>
                    <div>Screen Sharing: {peer.isScreenSharing ? 'On' : 'Off'}</div>
                </div>
            ))}
        </div>
    );
};

export default WebRTCCommunication;
