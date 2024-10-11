'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Settings, Share, Video, Mic, MicOff, VideoOff, Monitor, MessageSquare, ScanFace, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import AvatarCircles from '@/components/ui/avatar-circles'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { usePathname } from 'next/navigation'
import { Editor, Timer } from '@/widgets'
import { ModeToggle } from '@/components/mode-toggle'
import { TaskList } from '@/components/TaskList'
import { useMutation } from '@tanstack/react-query'
import { Select } from '@/components/ui/select'
import { runCode } from '@/shared/api/interview'
import { defaultLanguage } from '@/widgets/editor/const'
import { useCommonStore } from '@/shared/store/global'
import { Cursor, CursorDetails } from '@/widgets/editor/model'
import { socket } from '@/shared/lib/hooks'
import { randomTWColor } from '@/shared/lib/utils'
import { v4 as uuidv4 } from 'uuid'
import { AxiosError } from 'axios'
import * as signalR from '@microsoft/signalr'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import InterviewChat from '@/components/InterviewChat/InterviewChat'

const userId = uuidv4()

const VideoTab = () => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const localDisplayRef = useRef<HTMLVideoElement>(null)
  const remoteDisplayRef = useRef<HTMLVideoElement>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [localDisplayStream, setLocalDisplayStream] = useState<MediaStream | null>(null)
  const [remoteDisplayStream, setRemoteDisplayStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/api/chatHub`)
      .withAutomaticReconnect()
      .build()

    hubConnection
      .start()
      .then(() => {
        console.log('SignalR Connected')
        setConnection(hubConnection)
        setupSignalRListeners(hubConnection)
      })
      .catch((err) => console.error('SignalR Connection Error: ', err))

    return () => {
      hubConnection.stop()
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }
      if (localDisplayStream) {
        localDisplayStream.getTracks().forEach((track) => track.stop())
      }
      if (remoteStream) {
        remoteStream.getTracks().forEach((track) => track.stop())
      }
      if (remoteDisplayStream) {
        remoteDisplayStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const setupSignalRListeners = (hubConnection: signalR.HubConnection) => {
    hubConnection.on('ReceiveOffer', async (room: string, offer: RTCSessionDescriptionInit, isShare: boolean) => {
      const peerConnection = getPeerConnection(isShare)
      await peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(offer as unknown as string)))

      const answer = await peerConnection.createAnswer()
      await peerConnection.setLocalDescription(answer)
      // console.log('Sending Answer:', answer);
      hubConnection.invoke('SendAnswer', '1', JSON.stringify(answer), isShare)
    })

    hubConnection.on('ReceiveAnswer', async (room: string, answer: RTCSessionDescriptionInit, isShare: boolean) => {
      const peerConnection = getPeerConnection(isShare)
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
    })

    hubConnection.on('ReceiveCandidate', async (room: string, candidate: RTCIceCandidateInit, isShare: boolean) => {
      // console.log('Received ICE Candidate:', JSON.parse(candidate as string));
      const peerConnection = getPeerConnection(isShare)
      await peerConnection.addIceCandidate(new RTCIceCandidate(JSON.parse(candidate as string)))
    })

    hubConnection.on('ReceiveScreenShareState', (isEnabled: boolean) => {
      // console.log('ReceiveScreenShareState', isEnabled);
      if (!isEnabled && remoteDisplayRef.current) {
        remoteDisplayRef.current.srcObject = null
        setRemoteDisplayStream(null)
      }
    })

    hubConnection.on('ReceiveMicrophoneState', (isEnabled: boolean) => {
      if (remoteVideoRef.current) {
        const audioTracks =
          remoteVideoRef.current.srcObject instanceof MediaStream
            ? remoteVideoRef.current.srcObject.getAudioTracks()
            : []
        audioTracks.forEach((track) => (track.enabled = isEnabled))
      }
    })

    hubConnection.on('ReceiveCameraState', (isEnabled: boolean) => {
      if (remoteVideoRef.current) {
        const videoTracks =
          remoteVideoRef.current.srcObject instanceof MediaStream
            ? remoteVideoRef.current.srcObject.getVideoTracks()
            : []
        videoTracks.forEach((track) => (track.enabled = isEnabled))
      }
    })
  }

  const getPeerConnection = (isShare: boolean): RTCPeerConnection => {
    if (!peerConnectionRef.current) {
      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      })

      peerConnection.onicecandidate = (event) => {
        if (event.candidate && connection) {
          // console.log('Sending ICE Candidate:', event.candidate);
          connection.invoke('SendIceCandidate', '1', JSON.stringify(event.candidate), isScreenSharing)
        }
      }

      peerConnection.ontrack = (event) => {
        // console.log('Received remote track:', event.streams[0]);
        if (isShare) {
          setRemoteDisplayStream(event.streams[0])
          if (remoteDisplayRef.current) {
            remoteDisplayRef.current.srcObject = event.streams[0]
          }
        } else {
          setRemoteStream(event.streams[0])
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0]
          }
        }
      }

      peerConnectionRef.current = peerConnection
    }
    return peerConnectionRef.current
  }

  const startScreenShare = async () => {
    try {
      const stream = await (navigator.mediaDevices as any).getDisplayMedia({
        video: true,
        audio: true,
      })

      setLocalDisplayStream(stream)
      setIsScreenSharing(true)
      if (localDisplayRef.current) {
        localDisplayRef.current.srcObject = stream
      }

      const peerConnection = getPeerConnection(true)
      stream.getTracks().forEach((track: MediaStreamTrack) => peerConnection.addTrack(track, stream))

      const offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)

      if (connection) {
        // console.log('Sending Offer:', offer);
        connection.invoke('SendOffer', '1', JSON.stringify(offer), true)
      }

      stream.getVideoTracks()[0].onended = () => {
        stopSharing()
      }
    } catch (error) {
      console.error('Error during screen sharing: ', error)
    }
  }

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      setLocalStream(stream)
      setIsScreenSharing(false)
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }

      const peerConnection = getPeerConnection(false)
      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream))

      const offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)

      if (connection) {
        connection.invoke('SendOffer', '1', JSON.stringify(offer), false)
      }
    } catch (error) {
      console.error('Error during video call: ', error)
    }
  }

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        console.log(audioTrack.enabled)
        setIsAudioOn(audioTrack.enabled)
        if (connection) {
          connection.invoke('SendAudioState', '1', audioTrack.enabled)
        }
      }
    }
  }

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setIsVideoOn(videoTrack.enabled)
        if (connection) {
          connection.invoke('SendVideoState', '1', videoTrack.enabled)
        }
      }
    }
  }

  const stopSharing = () => {
    if (localDisplayStream) {
      localDisplayStream.getTracks().forEach((track) => track.stop())
      setLocalDisplayStream(null)
      setIsScreenSharing(false)
      if (localDisplayRef.current) {
        localDisplayRef.current.srcObject = null
      }
      if (connection) {
        connection.invoke('SendScreenShareState', '1', false)
      }
    }
  }

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream
    }
  }, [localStream])

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [remoteStream])

  useEffect(() => {
    if (localDisplayRef.current && localDisplayStream) {
      localDisplayRef.current.srcObject = localDisplayStream
    }
  }, [localDisplayStream])

  useEffect(() => {
    if (remoteDisplayRef.current && remoteDisplayStream) {
      remoteDisplayRef.current.srcObject = remoteDisplayStream
    }
  }, [remoteDisplayStream])

  return (
    <div className='relative aspect-video w-full bg-muted h-full'>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'space-around' }}>
        <button onClick={startCall}>Start Call</button>
        {localStream && (
          <div>
            <h3>Local Video Screen</h3>
            <video ref={localVideoRef} autoPlay playsInline muted controls style={{ width: '100%' }} />
          </div>
        )}
        {localDisplayStream && (
          <div>
            <h3>Local Video Display</h3>
            <video ref={localDisplayRef} autoPlay playsInline muted controls style={{ width: '100%' }} />
            <button onClick={stopSharing}>Stop Sharing</button>
          </div>
        )}
        {remoteStream && (
          <div>
            <h3>Remote Video Screen</h3>
            <video ref={remoteVideoRef} autoPlay playsInline controls style={{ width: '100%' }} />
          </div>
        )}
        {remoteDisplayStream && (
          <div>
            <h3>Remote Video Display</h3>
            <video ref={remoteDisplayRef} autoPlay playsInline controls style={{ width: '100%' }} />
          </div>
        )}
      </div>
      <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
        <Button variant='secondary' size='icon' onClick={toggleAudio}>
          {isAudioOn ? <Mic className='size-4' /> : <MicOff className='size-4' />}
        </Button>
        <Button variant='secondary' size='icon' onClick={toggleVideo}>
          {isVideoOn ? <Video className='size-4' /> : <VideoOff className='size-4' />}
        </Button>
        <Button variant='secondary' size='icon'>
          <Monitor onClick={isScreenSharing ? stopSharing : startScreenShare} className='size-4' />
        </Button>
        <Button variant='secondary' size='icon' onClick={() => setIsChatOpen(true)}>
          <MessageSquare className='size-4' />
        </Button>
      </div>
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent>
          <InterviewChat connection={connection} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

type Tabs = 'video' | 'tasks'

const tasks = [
  {
    author: 'Вениамин Ряднов',
    title: 'Задача на алгоритмы',
    description: 'Найти самый оптимальный путь доставки товара',
    tags: [{ text: 'алгоритмы' }, { text: 'с#' }, { text: 'typescript' }],
  },
]

const TasksTab = () => {
  const [code, setCode] = useState('')
  const [terminalValue, setTerminalValue] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>(defaultLanguage)
  const [cursors, setCursors] = useState<CursorDetails[]>([])
  const { languages } = useCommonStore()

  const runCodeMutation = useMutation({
    mutationKey: ['run-code'],
    mutationFn: runCode,
    onSuccess: ({ data }) => setTerminalValue(data.output),
    onError: ({ response }: AxiosError<{ error: string }>) => setTerminalValue(response?.data?.error ?? ''),
  })

  const handleRunCode = () => {
    runCodeMutation.mutate({ code, language: selectedLanguage })
  }

  const handleUpdateCode = (code: string) => {
    setCode(code)
    socket.emit('code-update', code)
  }

  const handleUpdateCursors = (cursor: Cursor) => {
    socket.emit('code-cursors-update', JSON.stringify(cursor))
  }

  useEffect(() => {
    const userData = {
      userId,
      color: randomTWColor(),
    }

    socket.on('code-update', (event) => {
      setCode(event)
    })

    socket.on('code-cursors-update', (event: string) => {
      const data = { ...JSON.parse(event), ...userData } as CursorDetails

      setCursors((prev) => {
        const isCursorExist = prev.find((cursor) => cursor.userId === data.userId)

        if (isCursorExist) {
          return prev.map((cursor) => (cursor.userId === data.userId ? data : cursor))
        } else {
          return [...prev, data]
        }
      })
    })
  }, [])

  const isExecutable = languages[selectedLanguage]?.isExecutable

  return (
    <div className='flex gap-4 md:flex-row flex-col h-full'>
      <div className='border rounded-lg p-4 w-full md:w-[35%] h-1/2 md:h-full'>
        <h2 className='text-lg font-semibold mb-2'>Список заданий</h2>
        <TaskList tasks={tasks} />
      </div>
      <div className='border rounded-lg p-4 w-full md:w-[65%] h-1/2 md:h-full flex flex-col'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold'>Редактор кода</h2>
          <Select
            className='w-60'
            items={Object.keys(languages).map((language) => ({ value: language, title: language }))}
            value={selectedLanguage}
            onChange={(value) => setSelectedLanguage(value)}
            placeholder='Язык'
            label='Язык'
          />
        </div>
        <div className='h-full w-full'>
          <Editor
            terminalValue={terminalValue}
            selectedLanguage={selectedLanguage}
            updateCode={handleUpdateCode}
            updateCursor={handleUpdateCursors}
            className='code-editor'
            terminal={isExecutable}
            cursors={cursors}
            code={code}
          />
        </div>
        {isExecutable && (
          <Button className='mt-4 w-fit' onClick={handleRunCode}>
            Запустить
          </Button>
        )}
      </div>
    </div>
  )
}

export default function InterviewPageProtected() {
  const [activeTab, setActiveTab] = useState<Tabs>('tasks')
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const pathname = usePathname()
  const id = pathname.split('/').pop()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <TooltipProvider>
      <div className='grid h-screen w-full pl-[53px]'>
        <aside className='inset-y fixed left-0 z-20 flex h-full flex-col border-r'>
          <div className='border-b p-2'>
            <Button variant='outline' size='icon' aria-label='Home'>
              <ScanFace className='size-5 fill-foreground' />
            </Button>
          </div>
          <nav className='grid gap-1 p-2'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className={`rounded-lg ${activeTab === 'video' ? 'bg-muted' : ''}`}
                  aria-label='Видеосвязь'
                  onClick={() => setActiveTab('video')}
                >
                  <Video className='size-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Видеосвязь
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className={`rounded-lg ${activeTab === 'tasks' ? 'bg-muted' : ''}`}
                  aria-label='Задания'
                  onClick={() => setActiveTab('tasks')}
                >
                  <Bot className='size-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Задания
              </TooltipContent>
            </Tooltip>
          </nav>
          <nav className='mt-auto grid gap-2 p-2'>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Тема
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='mt-auto rounded-lg'
                  aria-label='Account'
                  onClick={() => setIsSettingsModalOpen(true)}
                >
                  <Settings className='size-5' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right' sideOffset={5}>
                Настройки
              </TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className='flex flex-col'>
          <header className='sticky top-0 z-10 flex h-[53px] items-center gap-4 border-b bg-background px-4'>
            <h1 className='text-xl font-semibold'>
              Интервью ・ <Timer />
            </h1>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant='ghost' size='icon' className='md:hidden'>
                  <Settings className='size-4' />
                  <span className='sr-only'>Settings</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className='max-h-[80vh]'>Настройки</DrawerContent>
            </Drawer>

            <div className='ml-auto gap-5 flex'>
              <div className='flex right-0'>
                <AvatarCircles users={[{ name: 'Вениамин Ряднов' }, { name: 'Кирилл Фролов' }]} />
              </div>
              <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
                <DialogTrigger asChild>
                  <Button variant='outline' size='sm' className='text-sm'>
                    <Share className='size-3.5 mr-2' />
                    Поделиться
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Поделиться ссылкой на интервью</DialogTitle>
                    <DialogDescription>Скопируйте ссылку ниже, чтобы поделиться этим интервью.</DialogDescription>
                  </DialogHeader>
                  <div className='flex items-center space-x-2'>
                    <Input readOnly value={`https://${window.location.host}/interview/${id}`} />
                    <Button onClick={() => copyToClipboard(`https://${window.location.host}/interview/${id}`)}>
                      Копировать
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </header>
          <main className='flex-1 overflow-auto p-4 flex'>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Tabs)} className='w-full flex-1'>
              <TabsContent value='video' className='mt-0 h-full'>
                <VideoTab />
              </TabsContent>
              <TabsContent value='tasks' className='mt-0 h-full'>
                <TasksTab />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
      <Dialog open={isSettingsModalOpen} onOpenChange={setIsSettingsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Настройки интервью</DialogTitle>
            <DialogDescription>Выберите микрофон и камеру для трансляции.</DialogDescription>
          </DialogHeader>
          <div className='space-y-4'>
            <div>
              <label htmlFor='microphone' className='block text-sm font-medium text-gray-700'>
                Микрофон
              </label>
              <select
                id='microphone'
                name='microphone'
                className='mt-1 block w-full pl-3 pr-10 py-2 text-base border dark:border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
              >
                <option>Микрофон 1</option>
                <option>Микрофон 2</option>
              </select>
            </div>
            <div>
              <label htmlFor='camera' className='block text-sm font-medium text-gray-700'>
                Камера
              </label>
              <select
                id='camera'
                name='camera'
                className='mt-1 block w-full pl-3 pr-10 py-2 text-base border dark:border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
              >
                <option>Камера 1</option>
                <option>Камера 2</option>
              </select>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}
