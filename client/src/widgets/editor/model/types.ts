import { Position, Selection, editor } from 'monaco-editor'

export interface Cursor {
  position: Position
  selection: Selection
}

export interface CursorDetails extends Cursor {
  userId: string
  color: string
}

export interface Props {
  selectedLanguage?: string
  editorOptions?: editor.IStandaloneEditorConstructionOptions
  code: string
  cursors?: CursorDetails[]
  isLoading?: boolean
  className?: string
  terminal?: boolean
  terminalValue?: string
  updateCode?: (code: string) => void
  updateCursor?: (cursor: Cursor) => void
}
