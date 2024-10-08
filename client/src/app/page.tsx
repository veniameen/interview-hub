/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { Lights } from '@/components/lights'
// import Interview from "@/components/Interview/interview";
import AiButton from '@/components/ai-button'
import ShiningButton from '@/components/shiningButton'
import Header from '@/components/header'
import { Particles } from '@/components/particles'
import Editor, { OnMount } from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react'
import { Select, SelectItem } from '@nextui-org/select'
import * as monaco from 'monaco-editor'
import { LANGUAGES, initialCode } from '../const'
import { Button } from '@nextui-org/react'
import { axiosInstance } from '@/utils'

import { io } from 'socket.io-client'

export const socket = io()

export default function Home() {
  const [code, setCode] = useState(initialCode)
  const [languages, setLanguages] = useState([LANGUAGES.javascript])
  const [selectedLanguage, setSelectedLanguage] = useState<string>(LANGUAGES.javascript)
  const [cursors, setCursors] = useState<
    { id: string; position: monaco.Position; range: monaco.Selection; color: string }[]
  >([])

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const decorationsRef = useRef<string[]>([])
  const colorMap = useRef<{ [key: string]: string }>({})

  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange']

  const [isConnected, setIsConnected] = useState(false)
  const [transport, setTransport] = useState('N/A')

  useEffect(() => {
    if (socket.connected) {
      onConnect()
    }

    function onConnect() {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name)
      })
    }

    function onDisconnect() {
      setIsConnected(false)
      setTransport('N/A')
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value)
    }
  }

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor

    editor.onDidChangeCursorPosition((event) => {
      const position = event.position
      const selection = editor.getSelection()

      if (selection) {
        // const cursorData = {
        //   id: webSocket.url, // You can use other unique identifiers like user ID
        //   position,
        //   selection,
        // }
        // webSocket.send(JSON.stringify(cursorData)) // Send cursor data to server
      }
    })
  }

  useEffect(() => {
    axiosInstance.get('/languages').then(({ data }) => {
      setLanguages(data)
    })
  }, [])

  // Обновляем декорации курсоров
  useEffect(() => {
    if (!editorRef.current) return

    const newDecorations = cursors.map((cursor) => {
      return [
        {
          range: new monaco.Range(
            cursor.position.lineNumber,
            cursor.position.column,
            cursor.position.lineNumber,
            cursor.position.column,
          ),
          options: {
            className: `foreign-cursor-${cursor.color}`,
            afterContentClassName: `foreign-cursor-after-${cursor.color}`,
          },
        },
        {
          range: new monaco.Range(
            cursor.range.startLineNumber,
            cursor.range.startColumn,
            cursor.range.endLineNumber,
            cursor.range.endColumn,
          ),
          options: {
            className: `foreign-selection-${cursor.color}`,
          },
        },
      ]
    })

    decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, newDecorations.flat())
  }, [cursors])

  const handleStartCode = () => {
    if (!editorRef.current) return

    axiosInstance
      .post('/run-code', {
        code,
        language: selectedLanguage,
      })
      .then(({ data }) => {
        console.log(data)
      })
  }

  return (
    <>
      <div>
        <div className='bg-black w-full h-screen block'>
          <Particles>
            <Header />
            <div className={'w-full h-full relative  bg-grid-white/[0.03] px-4'}>
              <div
                className={
                  'w-full h-full flex flex-col sm:items-center items-start justify-center relative z-[1] animate-moveUp gap-4'
                }
              >
                <div className='relative w-full flex justify-center'>
                  <AiButton />
                </div>
                <div
                  className={
                    'text-transparent sm:text-center text-start font-bold sm:text-7xl text-4xl bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-black/[0.6] leading-none z-10'
                  }
                >
                  Собеседования
                  <br />
                  нового поколения.
                </div>
                <div className='text-white/[0.7] sm:text-center text-start'>
                  &ldquo;Автоматизируйте и оптимизируйте процесс отбора кандидатов с нашим сервисом
                  собеседований.&rdquo;
                </div>
                <div className='mt-5 w-full flex max-sm:flex-col justify-center sm:gap-10 gap-4 text-white items-center'>
                  <ShiningButton label='начать' />
                  <button className='h-8 flex items-center justify-center underline'>
                    <span>как это работает?</span>
                  </button>
                </div>
              </div>
              <div className={'absolute bottom-0 left-0 w-full h-full z-0 animate-appear opacity-0'}>
                <Lights />
              </div>
            </div>
          </Particles>
        </div>
        {/* <Interview /> */}
      </div>
      <div>
        <header className='h-16'>
          <Select
            className='bg-black'
            classNames={{ trigger: 'bg-black hover:bg-black', popoverContent: 'bg-black' }}
            value={selectedLanguage}
            onChange={(value) => setSelectedLanguage(value.target.value)}
            label='language'
          >
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </Select>
        </header>
        <main className='h-[calc(80vh-24rem)] flex items-center justify-center'>
          <Editor
            defaultLanguage='javascript'
            language={selectedLanguage}
            className='bg-black'
            saveViewState
            theme='vs-dark'
            height={'100%'}
            onChange={handleEditorChange}
            onMount={handleEditorMount}
            value={code}
            options={{ minimap: { enabled: false } }}
          />
        </main>
        <footer className='h-4'>
          <Button onClick={handleStartCode} color='secondary'>
            Start
          </Button>
        </footer>
      </div>
    </>
  )
}
