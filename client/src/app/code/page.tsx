'use client'

import Editor, { OnMount } from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react'
import { Select, SelectItem } from '@nextui-org/select'
import * as monaco from 'monaco-editor'
import { LANGUAGES, initialCode } from '../../const'
import { Button } from '@nextui-org/react'
import { axiosInstance } from '@/utils'

import { io } from 'socket.io-client'

export const socket = io()

const CodePage = () => {
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
  )
}

export default CodePage
