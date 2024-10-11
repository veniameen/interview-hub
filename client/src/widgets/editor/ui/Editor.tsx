'use client'

import { type FC, useEffect, useRef, useState } from 'react'
import type { editor } from 'monaco-editor'
import MonacoEditor, { OnMount } from '@monaco-editor/react'
import { defaultEditorOptions } from '../const'
import { Cursor, Props } from '../model'
import { getCursorPositionOptions, getCursorSelectionOptions, getRange } from '../lib'
import './editor.css'
import { Terminal as TerminalIcon } from 'lucide-react'
import Terminal from 'react-terminal-ui'
import { Button } from '@/components/ui/button'

export const Editor: FC<Props> = ({
  cursors,
  className,
  editorOptions,
  selectedLanguage,
  isLoading,
  code,
  terminal = true,
  terminalValue,
  updateCode,
  updateCursor,
}) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const decorationsRef = useRef<string[]>([])

  const handleEditorChange = (value: string | undefined) => {
    updateCode?.(value ?? '')
  }

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor

    if (updateCursor) {
      editor.onDidChangeCursorPosition((event) => {
        const position = event.position
        const selection = editor.getSelection()

        if (selection) {
          const cursorData: Cursor = {
            position,
            selection,
          }

          updateCursor(cursorData)
        }
      })
    }
  }

  useEffect(() => {
    if (!editorRef.current || !cursors) return

    const newDecorations = cursors
      .map(
        (cursor) =>
          [
            {
              range: getRange(
                cursor.position.lineNumber,
                cursor.position.column,
                cursor.position.lineNumber,
                cursor.position.column,
              ),
              options: getCursorPositionOptions(cursor),
            },
            {
              range: getRange(
                cursor.selection.startLineNumber,
                cursor.selection.startColumn,
                cursor.selection.endLineNumber,
                cursor.selection.endColumn,
              ),
              options: getCursorSelectionOptions(cursor),
            },
          ] as editor.IModelDeltaDecoration[],
      )
      .flat()

    decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, newDecorations)
  }, [cursors])

  useEffect(() => {
    if (terminalValue) {
      setIsTerminalOpen(true)
    }
  }, [terminalValue])

  return (
    <div className='relative h-full w-full'>
      <MonacoEditor
        defaultLanguage='javascript'
        language={selectedLanguage}
        saveViewState
        loading={isLoading}
        theme='vs-dark'
        className={className}
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        value={code}
        options={editorOptions ?? defaultEditorOptions}
      />
      {!isLoading && terminal && (
        <>
          <Button
            className='absolute bottom-2 z-20 right-2 h-6 w-6 p-0'
            onClick={() => setIsTerminalOpen((prev) => !prev)}
          >
            <TerminalIcon size={12} />
          </Button>
          {isTerminalOpen && (
            <div className='absolute left-0 right-0 bottom-0'>
              <Terminal
                yellowBtnCallback={() => setIsTerminalOpen(false)}
                redBtnCallback={() => setIsTerminalOpen(false)}
                height='300px'
              >
                {terminalValue}
              </Terminal>
            </div>
          )}
        </>
      )}
    </div>
  )
}
