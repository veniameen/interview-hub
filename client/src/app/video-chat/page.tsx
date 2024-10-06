/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';

import React, { useEffect, useRef, useState } from 'react';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default function VideoChat() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const dataChannelRef = useRef(null);
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const startVideoChat = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        peerConnectionRef.current = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        stream.getTracks().forEach(track => {
          peerConnectionRef.current.addTrack(track, stream);
        });

        peerConnectionRef.current.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        dataChannelRef.current = peerConnectionRef.current.createDataChannel('chat');

        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            console.log(event.candidate);
          }
        };

        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);

        if ('webkitSpeechRecognition' in window) {
          recognitionRef.current = new webkitSpeechRecognition();
          recognitionRef.current.continuous = true;
          recognitionRef.current.interimResults = true;
        
          recognitionRef.current.onresult = (event) => {
            const lastResultIndex = event.results.length - 1;
            const lastResult = event.results[lastResultIndex];
            const transcript = lastResult[0].transcript;
        
            if (lastResult.isFinal) {
              setTranscription(prevTranscription => prevTranscription + ' ' + transcript);
            } 
          };
        
          recognitionRef.current.start();
        }
      } catch (error) {
        console.error(error);
      }
    };

    startVideoChat();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

  const generateSummary = async () => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4-0613",
        messages: [
          { role: "system", content: "You are a helpful assistant that summarizes text." },
          { role: "user", content: `Summarize the following text in a concise manner: ${transcription}` },
        ],
      });

      setSummary(completion.choices[0].message.content);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Видео</h2>
          <video ref={localVideoRef} autoPlay muted playsInline className="w-64 h-48 bg-gray-200" />
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Текст</h2>
        <textarea
          value={transcription}
          readOnly
          className="w-full h-32 p-2 border rounded text-black"
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Краткое содержание</h2>
        <textarea
          value={summary}
          readOnly
          className="w-full h-32 p-2 border rounded text-black"
        />
        <button onClick={generateSummary}>Сгенерировать</button>
      </div>
    </div>
  );
};